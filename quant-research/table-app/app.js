const state = {
  rawRows: [],
  rows: [],
  columns: [],
  filter: null,
  summaries: []
};

const elements = {
  thead: document.querySelector("#dataTable thead"),
  tbody: document.querySelector("#dataTable tbody"),
  tfoot: document.querySelector("#dataTable tfoot")
};

function setData(data, options = {}) {
  state.rawRows = normalizeRows(data);
  state.columns = options.columns && options.columns.length ? options.columns : getColumns(state.rawRows);
  state.rows = [...state.rawRows];
  state.filter = null;
  state.summaries = options.summaries || [];
  render();
  return getState();
}

function clearData() {
  state.rawRows = [];
  state.rows = [];
  state.columns = [];
  state.filter = null;
  state.summaries = [];
  render();
  return getState();
}

function applyFilter(column, operator = "contains", value = "") {
  if (!column) {
    state.filter = null;
    state.rows = [...state.rawRows];
    render();
    return getState();
  }

  state.filter = { column, operator, value };
  state.rows = state.rawRows.filter((row) => matchesFilter(row[column], operator, value));
  render();
  return getState();
}

function resetFilter() {
  state.filter = null;
  state.rows = [...state.rawRows];
  render();
  return getState();
}

function setSummaries(summaries = []) {
  state.summaries = summaries;
  renderFoot();
  return getState();
}

function normalizeRows(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeRecord);
  }

  if (value && typeof value === "object") {
    const arrayValue = Object.values(value).find((item) => Array.isArray(item));
    if (arrayValue && arrayValue.every((item) => item && typeof item === "object" && !Array.isArray(item))) {
      return arrayValue.map(normalizeRecord);
    }

    return [normalizeRecord(value)];
  }

  return [{ value }];
}

function normalizeRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return { value: record };
  }

  return record;
}

function getColumns(rows) {
  const seen = new Set();
  const columns = [];

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!key.startsWith("__") && !seen.has(key)) {
        seen.add(key);
        columns.push(key);
      }
    });
  });

  return columns;
}

function matchesFilter(cellValue, operator, filterValue) {
  const empty = cellValue === null || cellValue === undefined || cellValue === "";

  if (operator === "empty") return empty;
  if (operator === "notEmpty") return !empty;

  const cellNumber = Number(cellValue);
  const filterNumber = Number(filterValue);
  const bothNumeric = !Number.isNaN(cellNumber) && !Number.isNaN(filterNumber) && String(filterValue).trim() !== "";

  if (bothNumeric && ["gt", "gte", "lt", "lte"].includes(operator)) {
    if (operator === "gt") return cellNumber > filterNumber;
    if (operator === "gte") return cellNumber >= filterNumber;
    if (operator === "lt") return cellNumber < filterNumber;
    if (operator === "lte") return cellNumber <= filterNumber;
  }

  const cellText = stringifyCell(cellValue).toLowerCase();
  const filterText = String(filterValue).toLowerCase();

  if (operator === "equals") return cellText === filterText;
  if (operator === "notEquals") return cellText !== filterText;
  if (operator === "gt") return cellText > filterText;
  if (operator === "gte") return cellText >= filterText;
  if (operator === "lt") return cellText < filterText;
  if (operator === "lte") return cellText <= filterText;
  return cellText.includes(filterText);
}

function render() {
  renderHead();
  renderBody();
  renderFoot();
}

function renderHead() {
  elements.thead.textContent = "";
  if (state.columns.length === 0) return;

  const row = document.createElement("tr");
  state.columns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column;
    row.appendChild(th);
  });
  elements.thead.appendChild(row);
}

function renderBody() {
  elements.tbody.textContent = "";

  const fragment = document.createDocumentFragment();
  state.rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.__summary) {
      tr.classList.add("summary-row");
    }

    state.columns.forEach((column) => {
      const td = document.createElement("td");
      const value = row.__summary && column === state.columns[0] ? row.__label : row[column];
      td.textContent = stringifyCell(value);
      if (isFiniteNumber(value)) {
        td.classList.add("number-cell");
      }
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });

  elements.tbody.appendChild(fragment);
}

function renderFoot() {
  elements.tfoot.textContent = "";
  if (state.columns.length === 0 || state.summaries.length === 0) return;

  state.summaries.forEach((summary) => {
    elements.tfoot.appendChild(buildSummaryRow(summary));
  });
}

function buildSummaryRow(summary) {
  const tr = document.createElement("tr");
  const values = summary.values || {};

  state.columns.forEach((column, index) => {
    const td = document.createElement("td");
    const value = index === 0 ? summary.label : values[column];
    td.textContent = value === undefined ? "" : stringifyCell(value);
    if (isFiniteNumber(value)) {
      td.classList.add("number-cell");
    }
    tr.appendChild(td);
  });

  return tr;
}

function stringifyCell(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function isFiniteNumber(value) {
  if (value === null || value === undefined || value === "") return false;
  return Number.isFinite(Number(value));
}

function getState() {
  return {
    totalRows: state.rawRows.length,
    displayedRows: state.rows.length,
    columns: [...state.columns],
    filter: state.filter,
    summaries: state.summaries
  };
}

window.JsonTableApp = {
  setData,
  clearData,
  applyFilter,
  resetFilter,
  setSummaries,
  getRows() {
    return [...state.rows];
  },
  getState
};

render();
