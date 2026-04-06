
// ==================== ESTADO GLOBAL ====================
let currentPage = 1;
let itemsPerPage = 10;
let currentFilter = 'lastYear';
let currentTab = 'referrals';
let affiliateData = null;
let allTransactions = [];
let customStartDate = null; 
let customEndDate = null;
let chartInstance = null;


// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', async () => {
    affiliateData = checkLogin();
    if (affiliateData) {
        // allTransactions = await generateSampleTransactions();
        initDashboard();
        // loadPaymentHistory();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePersonalInfoModal();
        closeMonthDetailModal();
        closeOrderDetailModal();
    }
});

// ==================== LOGIN ====================
function checkLogin() {
    const isLoggedIn = localStorage.getItem('affiliate_logged_in');
    const data = localStorage.getItem('affiliate_data');
    
    if (!isLoggedIn || !data) {
        window.location.replace('index.html');
        return null;
    }
    return JSON.parse(data);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('affiliate_logged_in');
        localStorage.removeItem('affiliate_data');
        window.location.href = 'index.html';
    }
}

// ==================== INICIALIZAR DASHBOARD ====================
function initDashboard() {
    updateUserInfo();
    updateStatsCards();
    updatePersonalInfoModal();
    initDefaultDates();
    applyFilter('lastYear', 'referrals');
}


/* =========================
   🔥 SWITCH TABS
========================= */
function switchTab(tabId) {
  var tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(function(btn) {
    btn.classList.remove('active');
  });

  var tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(function(content) {
    content.classList.remove('active');
  });

  var activeButton = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
  if (activeButton) {
    activeButton.classList.add('active');
  }

  var activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.add('active');
  }

  // Inicializar según el tab
  if (tabId === 'clients') {
    applyFilter(tableCurrentFilter, 'clients');
  } else if (tabId === 'commission') {
    initCommission();
  } else if (tabId === 'payments') {
    initPayments();  // 🔥 Inicializar Payments
  }
}



function updateUserInfo() {
    const fullName = `${affiliateData.first_name || ''} ${affiliateData.last_name || ''}`;
    const date = new Date(affiliateData.created_at).toLocaleDateString('en-EN', {
                           day: 'numeric',
                            month: 'long',
                            year: 'numeric'
    });
    
    document.getElementById('welcomeName').textContent = fullName;
    document.getElementById('welcomeDate').textContent = date;
   
}

function updateStatsCards() {
    document.getElementById('pendingAmount').textContent = `$${(affiliateData.pending_amount || 0).toFixed(2)}`;
    document.getElementById('approvedAmount').textContent = `$${(affiliateData.approved_amount || 0).toFixed(2)}`;
    document.getElementById('paidAmount').textContent = `$${(affiliateData.paid_amount || 0).toFixed(2)}`;
}

function updatePersonalInfoModal() {
    const fullName = `${affiliateData.first_name || ''} ${affiliateData.last_name || ''}`;
    document.getElementById('modalName').textContent = fullName;
    document.getElementById('modalCountry').textContent = affiliateData.country || '-';
    document.getElementById('modalStatus').textContent = affiliateData.status || '-';
}

function initDefaultDates() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);
    
    const startDateEl = document.getElementById('startDate');
    const endDateEl = document.getElementById('endDate');
    const startDateTEl = document.getElementById('startDateT');
    const endDateTEl = document.getElementById('endDateT');
    
    if (startDateEl) startDateEl.valueAsDate = startDate;
    if (endDateEl) endDateEl.valueAsDate = endDate;
    if (startDateTEl) startDateTEl.valueAsDate = startDate;
    if (endDateTEl) endDateTEl.valueAsDate = endDate;
}


/* =========================
   🔥 VARIABLES GLOBALES (DECLARAR PRIMERO)
========================= */

var tableCurrentFilter = "lastYear";
var tableCurrentView = "clients";
var filteredClientsData = [];
var dailyClientsData = [];  // 🔥 Nueva variable para datos diarios
var groupedChart = null;

/* =========================
   🔥 INICIALIZAR CUANDO DOM ESTÉ LISTO
========================= */

document.addEventListener("DOMContentLoaded", function() {
  originalClientsData = salesClients;
  applyFilter("lastYear", "clients");
});

/* =========================
   🔥 CAMBIAR VISTA (DROPDOWN)
========================= */

function changeTableView() {
  var selector = document.getElementById("tableViewSelector");
  if (!selector) return;
  
  tableCurrentView = selector.value;
  
  // Obtener la fuente de datos según la vista seleccionada
  var dataSource = tableCurrentView === "sales" ? salesAmountData : salesClients;
  
  // 🔥 Reaplicar el filtro actual con la nueva fuente de datos
  if (tableCurrentFilter === "currentMonth") {
    dailyClientsData = generateCurrentMonthClientsData(dataSource);
    renderDailyTable(dailyClientsData, tableCurrentFilter);
    updateGroupedChart(dailyClientsData, tableCurrentFilter);
  } else if (tableCurrentFilter === "previousMonth") {
    dailyClientsData = generatePreviousMonthClientsData(dataSource);
    renderDailyTable(dailyClientsData, tableCurrentFilter);
    updateGroupedChart(dailyClientsData, tableCurrentFilter);
  } else {
    var filtered = filterDataByDate(dataSource, tableCurrentFilter);
    filteredClientsData = groupDataByMonth(filtered);
    renderTable(filteredClientsData, tableCurrentFilter);
    updateGroupedChart(filteredClientsData, tableCurrentFilter);
  }
}

/* =========================
   🔥 FORMATEAR VALOR
========================= */

function formatValue(value) {
  if (tableCurrentView === "sales") {
    return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return value.toLocaleString("en-US");
}

/* =========================
   🔥 AGRUPAR POR MES
========================= */

function groupDataByMonth(data) {
  var grouped = data.reduce(function(acc, item) {
    var parts = item.date.split("-");
    var year = parts[0];
    var month = parts[1];
    var monthKey = year + "-" + month + "-01";

    if (!acc[monthKey]) {
      acc[monthKey] = { date: monthKey, newClients: 0, existingClients: 0 };
    }

    acc[monthKey].newClients += item.newClients;
    acc[monthKey].existingClients += item.existingClients;

    return acc;
  }, {});

  return Object.values(grouped).sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
}

/* =========================
   🔥 APLICAR FILTRO
========================= */

function applyFilter(filterType, viewType) {
  tableCurrentFilter = filterType;
  
  if (viewType) {
    tableCurrentView = viewType;
  }

  var container = document.getElementById("clientFilters");
  
  if (container) {
    var buttons = container.querySelectorAll(".filter-btn");
    buttons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    var activeBtn = container.querySelector('[data-filter="' + filterType + '"]');
    if (activeBtn) activeBtn.classList.add("active");
  }

  // 🔥 Obtener la fuente de datos según el selector
  var selector = document.getElementById("tableViewSelector");
  var currentView = selector ? selector.value : "clients";
  tableCurrentView = currentView;
  
  var dataSource = currentView === "sales" ? salesAmountData : salesClients;

  // 🔥 CURRENT MONTH - Todos los días del mes actual
  if (filterType === "currentMonth") {
    dailyClientsData = generateCurrentMonthClientsData(dataSource);
    renderDailyTable(dailyClientsData, filterType);
    updateGroupedChart(dailyClientsData, filterType);
    return;
  }

  // 🔥 PREVIOUS MONTH - Todos los días del mes anterior
  if (filterType === "previousMonth") {
    dailyClientsData = generatePreviousMonthClientsData(dataSource);
    renderDailyTable(dailyClientsData, filterType);
    updateGroupedChart(dailyClientsData, filterType);
    return;
  }

  // 🔥 Limpiar datos diarios
  dailyClientsData = [];

  var filtered = filterDataByDate(dataSource, filterType);
  filteredClientsData = groupDataByMonth(filtered);

  renderTable(filteredClientsData, filterType);
  updateGroupedChart(filteredClientsData, filterType);
}

function generateCurrentMonthClientsData(data) {
  var result = [];
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var endDay = today.getDate();
  
  for (var day = 1; day <= endDay; day++) {
    var formatted = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    result.push({
      date: formatted,
      newClients: dailyRecord ? dailyRecord.newClients : 0,
      existingClients: dailyRecord ? dailyRecord.existingClients : 0
    });
  }

  return result;
}


function generatePreviousMonthClientsData(data) {
  var result = [];
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  
  // Calcular mes anterior
  var prevMonth = month - 1;
  var prevYear = year;
  
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear = year - 1;
  }
  
  var lastDayOfPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
  for (var day = 1; day <= lastDayOfPrevMonth; day++) {
    var formatted = prevYear + "-" + String(prevMonth + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    result.push({
      date: formatted,
      newClients: dailyRecord ? dailyRecord.newClients : 0,
      existingClients: dailyRecord ? dailyRecord.existingClients : 0
    });
  }

  return result;
}

/* =========================
   🔥 FILTRAR POR FECHA
========================= */

function filterDataByDate(data, filterType) {
  var now = new Date();

  return data.filter(function(item) {
    var parts = item.date.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]) || 1;
    var itemDate = new Date(year, month - 1, day);

    switch (filterType) {
      case "yearly":
        var currentYear = now.getFullYear();
        var lastYear = currentYear - 1;
        return itemDate.getFullYear() === currentYear || itemDate.getFullYear() === lastYear;

      case "lastYear":
        var thirteenMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
        return itemDate >= thirteenMonthsAgo;

      case "ytd":
        // 🔥 Year to Date: Desde Enero hasta el mes actual del año actual
        var currentYear = now.getFullYear();
        var startOfYear = new Date(currentYear, 0, 1); // 1 de Enero
        return itemDate >= startOfYear && itemDate.getFullYear() === currentYear;

      case "sixMonths":
        var sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        return itemDate >= sixMonthsAgo;

      default:
        return true;
    }
  });
}

/* =========================
   🔥 GENERAR DATA DIARIA
========================= */

function generateDailyDataFromMonthly(data) {
  var result = [];
  var today = new Date();

  for (var i = 0; i < 10; i++) {
    var tempDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);

    var year = tempDate.getFullYear();
    var month = String(tempDate.getMonth() + 1).padStart(2, "0");
    var day = String(tempDate.getDate()).padStart(2, "0");
    var formatted = year + "-" + month + "-" + day;

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    result.push({
      date: formatted,
      newClients: dailyRecord ? dailyRecord.newClients : 0,
      existingClients: dailyRecord ? dailyRecord.existingClients : 0
    });
  }

  return result;
}


/* =========================
   🔥 TABLA MENSUAL
========================= */

function renderTable(data, filterType) {
  var head = document.getElementById("clientTableHead");
  var body = document.getElementById("clientTableBody");

  if (!head || !body) return;

  head.innerHTML = "";
  body.innerHTML = "";

  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var lastYear = currentYear - 1;

  var monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  // 🔥 Determinar labels según la vista
  var newLabel = tableCurrentView === "sales" ? "New Clients Sales" : "New Clients";
  var existingLabel = tableCurrentView === "sales" ? "Existing Clients Sales" : "Existing Clients";

  // 🔥 Calcular YTD (Year to Date) - Solo meses del año actual
  var ytdData = data.filter(function(item) {
    return new Date(item.date).getFullYear() === currentYear;
  });

  var totalYTD = ytdData.reduce(function(sum, item) {
    return {
      newClients: 155,
      existingClients: 128
    };
  }, { newClients: 0, existingClients: 0 });

  // 🔥 YEARLY: Solo años con columna YTD
  if (filterType === "yearly") {
    var totalCurrentYear = data
      .filter(function(item) { return new Date(item.date).getFullYear() === currentYear; })
      .reduce(function(sum, item) {
        return {
          newClients: sum.newClients + item.newClients,
          existingClients: sum.existingClients + item.existingClients
        };
      }, { newClients: 0, existingClients: 0 });

    var totalLastYear = data
      .filter(function(item) { return new Date(item.date).getFullYear() === lastYear; })
      .reduce(function(sum, item) {
        return {
          newClients: sum.newClients + item.newClients,
          existingClients: sum.existingClients + item.existingClients
        };
      }, { newClients: 0, existingClients: 0 });

    head.innerHTML = 
      '<tr>' +
        '<th>STATUS</th>' +
        '<th>YTD</th>' +
        '<th>' + currentYear + '</th>' +
        '<th>' + lastYear + '</th>' +
      '</tr>';

    body.innerHTML = 
      '<tr>' +
        '<td>' + newLabel + '</td>' +
        '<td><strong>' + formatValue(totalYTD.newClients) + '</strong></td>' +
        '<td>' + formatValue(totalCurrentYear.newClients) + '</td>' +
        '<td>' + formatValue(totalLastYear.newClients) + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td>' + existingLabel + '</td>' +
        '<td><strong>' + formatValue(totalYTD.existingClients) + '</strong></td>' +
        '<td>' + formatValue(totalCurrentYear.existingClients) + '</td>' +
        '<td>' + formatValue(totalLastYear.existingClients) + '</td>' +
      '</tr>' +
      '<tr class="total-row">' +
        '<td><strong>Total</strong></td>' +
        '<td><strong>' + formatValue(totalYTD.newClients + totalYTD.existingClients) + '</strong></td>' +
        '<td><strong>' + formatValue(totalCurrentYear.newClients + totalCurrentYear.existingClients) + '</strong></td>' +
        '<td><strong>' + formatValue(totalLastYear.newClients + totalLastYear.existingClients) + '</strong></td>' +
      '</tr>';
    return;
  }

  // 🔥 OTROS FILTROS: Por meses con columna YTD
  var sorted = data.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // 🔥 HEADER CON COLUMNA YTD
  var headerRow = "<tr><th>Type</th><th>YTD</th>";
  sorted.forEach(function(item) {
    var parts = item.date.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    
    var isCurrentMonth = (year === currentYear && month === currentMonth);
    var thClass = isCurrentMonth ? 'th-current-month' : '';
    
    if (isCurrentMonth) {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">MTD</span>' +
                     '</div>' +
                   '</th>';
    } else {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">' + monthNames[month - 1] + '</span>' +
                       '<span class="th-year">' + year + '</span>' +
                     '</div>' +
                   '</th>';
    }
  });
  headerRow += "</tr>";

  // 🔥 ROWS CON COLUMNA YTD
  var newRow = '<tr><td>' + newLabel + '</td><td><strong>' + formatValue(totalYTD.newClients) + '</strong></td>';
  var existingRow = '<tr><td>' + existingLabel + '</td><td><strong>' + formatValue(totalYTD.existingClients) + '</strong></td>';
  var totalRow = '<tr class="total-row"><td><strong>Total</strong></td><td><strong>' + formatValue(totalYTD.newClients + totalYTD.existingClients) + '</strong></td>';

  sorted.forEach(function(item) {
    newRow += '<td>' + formatValue(item.newClients) + '</td>';
    existingRow += '<td>' + formatValue(item.existingClients) + '</td>';
    totalRow += '<td><strong>' + formatValue(item.newClients + item.existingClients) + '</strong></td>';
  });

  head.innerHTML = headerRow;
  body.innerHTML = newRow + '</tr>' + existingRow + '</tr>' + totalRow + '</tr>';
}

/* =========================
   🔥 FORMATO FECHA DIARIA
========================= */

function formatFullDate(dateString) {
  var date = new Date(dateString + "T00:00:00");
  var dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  var monthName = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  var dayNum = date.getDate();
  
  return '<div style="line-height:1.3; text-align:center;">' +
           '<div>' + dayName + ' ' + monthName + '</div>' +
           '<div>' + dayNum + ', ' + date.getFullYear() + '</div>' +
         '</div>';
}


/* =========================
   🔥 TABLA DIARIA
========================= */

function renderDailyTable(data, filterType) {
  var head = document.getElementById("clientTableHead");
  var body = document.getElementById("clientTableBody");

  if (!head || !body) return;

  head.innerHTML = "";
  body.innerHTML = "";

  var now = new Date();
  var todayStr = now.getFullYear() + '-' + 
                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                 String(now.getDate()).padStart(2, '0');

  var sorted = data.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // Calcular totales generales
  var totals = sorted.reduce(function(sum, item) {
    return {
      newClients: sum.newClients + item.newClients,
      existingClients: sum.existingClients + item.existingClients
    };
  }, { newClients: 0, existingClients: 0 });

  // 🔥 Determinar labels según la vista
  var newLabel = tableCurrentView === "sales" ? "New Clients Sales" : "New Clients";
  var existingLabel = tableCurrentView === "sales" ? "Existing Clients Sales" : "Existing Clients";

  // 🔥 HEADER CON COLUMNA TOTAL
  var headerRow = "<tr><th>Type</th><th>TOTAL</th>";
  sorted.forEach(function(item) {
    var date = new Date(item.date + "T00:00:00");
    var dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    var monthName = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    var dayNum = date.getDate();
    var year = date.getFullYear();
    
    var isToday = (item.date === todayStr);
    var thClass = isToday ? 'th-current-month' : '';
    
    if (isToday) {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">TODAY</span>' +
                     '</div>' +
                   '</th>';
    } else {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">' + dayName + ' ' + monthName + '</span>' +
                       '<span class="th-year">' + dayNum + ', ' + year + '</span>' +
                     '</div>' +
                   '</th>';
    }
  });
  headerRow += "</tr>";

  // 🔥 ROWS CON COLUMNA TOTAL
  var newRow = '<tr><td>' + newLabel + '</td><td><strong>' + formatValue(totals.newClients) + '</strong></td>';
  var existingRow = '<tr><td>' + existingLabel + '</td><td><strong>' + formatValue(totals.existingClients) + '</strong></td>';
  var totalRow = '<tr class="total-row"><td><strong>Total</strong></td><td><strong>' + formatValue(totals.newClients + totals.existingClients) + '</strong></td>';

  sorted.forEach(function(item) {
    newRow += '<td>' + formatValue(item.newClients) + '</td>';
    existingRow += '<td>' + formatValue(item.existingClients) + '</td>';
    totalRow += '<td><strong>' + formatValue(item.newClients + item.existingClients) + '</strong></td>';
  });

  head.innerHTML = headerRow;
  body.innerHTML = newRow + '</tr>' + existingRow + '</tr>' + totalRow + '</tr>';
}

/* =========================
   🔥 CHART (AL FINAL)
========================= */

/* =========================
   🔥 CHART (SINCRONIZADO CON TABLA)
========================= */

/* =========================
   🔥 CLIENTS CHART 
========================= */

function updateGroupedChart(data, filterType) {
  if (!filterType) {
    filterType = tableCurrentFilter;
  }

  if (!data || data.length === 0) {
    if (filterType === "currentMonth" || filterType === "previousMonth") {
      data = dailyClientsData;
    } else {
      data = filteredClientsData;
    }
  }

  if (!data || data.length === 0) return;

  var ctx = document.getElementById("commissionGroupedChart");
  if (!ctx) return;

  if (typeof Chart === "undefined") return;

  var chartTotalEl = document.getElementById("chartTotal");
  var chartNewEl = document.getElementById("chartNewClients");
  var chartExistingEl = document.getElementById("chartExistingClients");

  var showTotal = chartTotalEl ? chartTotalEl.checked : true;
  var showNew = chartNewEl ? chartNewEl.checked : false;
  var showExisting = chartExistingEl ? chartExistingEl.checked : false;

  var labels = [];
  var dataTotal = [];
  var dataNew = [];
  var dataExisting = [];

  var monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var lastYear = currentYear - 1;

  var todayStr = now.getFullYear() + '-' + 
                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                 String(now.getDate()).padStart(2, '0');

  // 🔥 Determinar labels según la vista
  var newLabel = tableCurrentView === "sales" ? "New Clients Sales" : "New Clients";
  var existingLabel = tableCurrentView === "sales" ? "Existing Clients Sales" : "Existing Clients";

  // 🔥 YEARLY
  if (filterType === "yearly") {
    var totalCurrentYear = data
      .filter(function(item) { return new Date(item.date).getFullYear() === currentYear; })
      .reduce(function(sum, item) {
        return {
          newClients: sum.newClients + item.newClients,
          existingClients: sum.existingClients + item.existingClients
        };
      }, { newClients: 0, existingClients: 0 });

    var totalLastYear = data
      .filter(function(item) { return new Date(item.date).getFullYear() === lastYear; })
      .reduce(function(sum, item) {
        return {
          newClients: sum.newClients + item.newClients,
          existingClients: sum.existingClients + item.existingClients
        };
      }, { newClients: 0, existingClients: 0 });

    labels = [String(currentYear), String(lastYear)];
    dataNew = [totalCurrentYear.newClients, totalLastYear.newClients];
    dataExisting = [totalCurrentYear.existingClients, totalLastYear.existingClients];
    dataTotal = [
      totalCurrentYear.newClients + totalCurrentYear.existingClients,
      totalLastYear.newClients + totalLastYear.existingClients
    ];

  // 🔥 DAILY (Current Month o Previous Month)
  } else if (filterType === "currentMonth" || filterType === "previousMonth") {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var isToday = (item.date === todayStr);
      var date = new Date(item.date + "T00:00:00");
      var dayNum = date.getDate();
      var monthName = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
      
      if (isToday) {
        labels.push("TODAY");
      } else {
        labels.push(dayNum + " " + monthName);
      }
      
      dataNew.push(item.newClients);
      dataExisting.push(item.existingClients);
      dataTotal.push(item.newClients + item.existingClients);
    });

    if (filterType === "ytd") {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var parts = item.date.split("-");
      var year = parseInt(parts[0]);
      var month = parseInt(parts[1]);
      
      var isCurrentMonth = (year === currentYear && month === currentMonth);
      
      if (isCurrentMonth) {
        labels.push("MTD");
      } else {
        labels.push([monthNames[month - 1], year]);
      }
      
      dataNew.push(item.newClients);
      dataExisting.push(item.existingClients);
      dataTotal.push(item.newClients + item.existingClients);
    });
  }


  // 🔥 MONTHLY
  } else {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var parts = item.date.split("-");
      var year = parseInt(parts[0]);
      var month = parseInt(parts[1]);
      
      var isCurrentMonth = (year === currentYear && month === currentMonth);
      
      if (isCurrentMonth) {
        labels.push("MTD");
      } else {
        labels.push([monthNames[month - 1], year]);
      }
      
      dataNew.push(item.newClients);
      dataExisting.push(item.existingClients);
      dataTotal.push(item.newClients + item.existingClients);
    });
  }

  var datasets = [];

  if (showTotal) {
    datasets.push({
      label: "Total",
      data: dataTotal,
      backgroundColor: "#ACA68B",
      borderColor: "#ACA68B",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showNew) {
    datasets.push({
      label: newLabel,
      data: dataNew,
      backgroundColor: "#5A348A",
      borderColor: "#5A348A",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showExisting) {
    datasets.push({
      label: existingLabel,
      data: dataExisting,
      backgroundColor: "#1B2C3A",
      borderColor: "#1B2C3A",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (datasets.length === 0) {
    datasets.push({
      label: "Total",
      data: dataTotal,
      backgroundColor: "#ACA68B",
      borderColor: "#ACA68B",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (groupedChart) {
    groupedChart.destroy();
    groupedChart = null;
  }

  groupedChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 15,
            font: { size: 12, weight: "500" },
            color: "#1E2227"
          }
        },
        tooltip: {
          backgroundColor: "#07070C",
          titleColor: "#FEFEFE",
          bodyColor: "#E8E9E9",
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              var value = context.raw;
              if (tableCurrentView === "sales") {
                value = "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2 });
              }
              return " " + context.dataset.label + ": " + value;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { 
            font: { size: 9, weight: "500" }, 
            color: "#535255",
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: "#E8E9E9" },
          ticks: {
            font: { size: 11 },
            color: "#535255",
            callback: function(value) {
              if (tableCurrentView === "sales") {
                return "$" + value.toLocaleString();
              }
              return value;
            }
          }
        }
      }
    }
  });
}








/* =========================
   🔥 VARIABLES COMMISSION
========================= */

var commissionCurrentFilter = "lastYear";
var filteredCommissionData = [];
var dailyCommissionData = [];  // 🔥 Nueva variable para datos diarios
var commissionChart = null;

/* =========================
   🔥 INICIALIZAR COMMISSION
========================= */

function initCommission() {
  applyCommissionFilter("lastYear");
}

/* =========================
   🔥 AGRUPAR COMMISSION POR MES CON BALANCE
========================= */

function groupCommissionByMonth(data) {
  var grouped = data.reduce(function(acc, item) {
    var parts = item.date.split("-");
    var year = parts[0];
    var month = parts[1];
    var monthKey = year + "-" + month + "-01";

    if (!acc[monthKey]) {
      acc[monthKey] = { 
        date: monthKey, 
        newCommission: 0, 
        existingCommission: 0,
        paid: 0,
        cancelled: 0
      };
    }

    acc[monthKey].newCommission += item.newCommission;
    acc[monthKey].existingCommission += item.existingCommission;
    acc[monthKey].paid += item.paid;
    acc[monthKey].cancelled += item.cancelled;

    return acc;
  }, {});

  // Convertir a array y ordenar por fecha
  var result = Object.values(grouped).sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  // Calcular Beginning Outstanding Balance para cada mes
  var runningBalance = 0;
  result.forEach(function(item) {
    item.beginningBalance = runningBalance;
    // Ending Balance = Beginning + New + Existing - Paid - Cancelled
    item.endingBalance = item.beginningBalance + item.newCommission + item.existingCommission - item.paid - item.cancelled;
    runningBalance = item.endingBalance;
  });

  return result;
}

/* =========================
   🔥 APLICAR FILTRO COMMISSION
========================= */

function applyCommissionFilter(filterType) {
  commissionCurrentFilter = filterType;

  var container = document.getElementById("commissionFilters");
  
  if (container) {
    var buttons = container.querySelectorAll(".filter-btn");
    buttons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    var activeBtn = container.querySelector('[data-filter="' + filterType + '"]');
    if (activeBtn) activeBtn.classList.add("active");
  }

  // 🔥 CURRENT MONTH - Todos los días del mes actual
  if (filterType === "currentMonth") {
    dailyCommissionData = generateCurrentMonthCommissionData(commissionData);
    renderCommissionDailyTable(dailyCommissionData, filterType);
    updateCommissionChart(dailyCommissionData, filterType);
    return;
  }

  // 🔥 PREVIOUS MONTH - Todos los días del mes anterior
  if (filterType === "previousMonth") {
    dailyCommissionData = generatePreviousMonthCommissionData(commissionData);
    renderCommissionDailyTable(dailyCommissionData, filterType);
    updateCommissionChart(dailyCommissionData, filterType);
    return;
  }

  // 🔥 Limpiar datos diarios
  dailyCommissionData = [];

  var filtered = filterCommissionByDate(commissionData, filterType);
  filteredCommissionData = groupCommissionByMonth(filtered);

  renderCommissionTable(filteredCommissionData, filterType);
  updateCommissionChart(filteredCommissionData, filterType);
}

function generateCurrentMonthCommissionData(data) {
  var result = [];
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  
  // Obtener el balance del mes anterior
  var allMonthlyData = groupCommissionByMonth(data);
  var previousBalance = 0;
  
  // Buscar el balance final del mes anterior
  var prevMonth = month - 1;
  var prevYear = year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear = year - 1;
  }
  var prevMonthKey = prevYear + "-" + String(prevMonth + 1).padStart(2, "0") + "-01";
  
  allMonthlyData.forEach(function(item) {
    if (item.date === prevMonthKey) {
      previousBalance = item.endingBalance;
    }
  });

  var runningBalance = previousBalance;
  var endDay = today.getDate();
  
  for (var day = 1; day <= endDay; day++) {
    var formatted = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    var newComm = dailyRecord ? dailyRecord.newCommission : 0;
    var existingComm = dailyRecord ? dailyRecord.existingCommission : 0;
    var paidComm = dailyRecord ? dailyRecord.paid : 0;
    var cancelledComm = dailyRecord ? dailyRecord.cancelled : 0;

    var beginningBalance = runningBalance;
    var endingBalance = beginningBalance + newComm + existingComm - paidComm - cancelledComm;
    runningBalance = endingBalance;

    result.push({
      date: formatted,
      beginningBalance: beginningBalance,
      newCommission: newComm,
      existingCommission: existingComm,
      paid: paidComm,
      cancelled: cancelledComm,
      endingBalance: endingBalance
    });
  }

  return result;
}

function generatePreviousMonthCommissionData(data) {
  var result = [];
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  
  // Calcular mes anterior
  var prevMonth = month - 1;
  var prevYear = year;
  
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear = year - 1;
  }
  
  // Obtener el balance del mes anterior al anterior
  var allMonthlyData = groupCommissionByMonth(data);
  var previousBalance = 0;
  
  var prevPrevMonth = prevMonth - 1;
  var prevPrevYear = prevYear;
  if (prevPrevMonth < 0) {
    prevPrevMonth = 11;
    prevPrevYear = prevYear - 1;
  }
  var prevPrevMonthKey = prevPrevYear + "-" + String(prevPrevMonth + 1).padStart(2, "0") + "-01";
  
  allMonthlyData.forEach(function(item) {
    if (item.date === prevPrevMonthKey) {
      previousBalance = item.endingBalance;
    }
  });

  var runningBalance = previousBalance;
  var lastDayOfPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
  for (var day = 1; day <= lastDayOfPrevMonth; day++) {
    var formatted = prevYear + "-" + String(prevMonth + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    var newComm = dailyRecord ? dailyRecord.newCommission : 0;
    var existingComm = dailyRecord ? dailyRecord.existingCommission : 0;
    var paidComm = dailyRecord ? dailyRecord.paid : 0;
    var cancelledComm = dailyRecord ? dailyRecord.cancelled : 0;

    var beginningBalance = runningBalance;
    var endingBalance = beginningBalance + newComm + existingComm - paidComm - cancelledComm;
    runningBalance = endingBalance;

    result.push({
      date: formatted,
      beginningBalance: beginningBalance,
      newCommission: newComm,
      existingCommission: existingComm,
      paid: paidComm,
      cancelled: cancelledComm,
      endingBalance: endingBalance
    });
  }

  return result;
}

/* =========================
   🔥 FILTRAR COMMISSION POR FECHA
========================= */

function filterCommissionByDate(data, filterType) {
  var now = new Date();

  return data.filter(function(item) {
    var parts = item.date.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]) || 1;
    var itemDate = new Date(year, month - 1, day);

    switch (filterType) {
      case "yearly":
        var currentYear = now.getFullYear();
        var lastYear = currentYear - 1;
        return itemDate.getFullYear() === currentYear || itemDate.getFullYear() === lastYear;

      case "lastYear":
        var thirteenMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
        return itemDate >= thirteenMonthsAgo;

      case "ytd":
        // 🔥 Year to Date: Desde Enero hasta el mes actual del año actual
        var currentYear = now.getFullYear();
        var startOfYear = new Date(currentYear, 0, 1);
        return itemDate >= startOfYear && itemDate.getFullYear() === currentYear;

      case "sixMonths":
        var sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        return itemDate >= sixMonthsAgo;

      default:
        return true;
    }
  });
}


/* =========================
   🔥 GENERAR DATA DIARIA COMMISSION
========================= */

function generateDailyCommissionData(data) {
  var result = [];
  var today = new Date();

  // Obtener balance del mes anterior
  var lastMonthData = groupCommissionByMonth(data);
  var previousBalance = 0;
  
  if (lastMonthData.length > 0) {
    // Encontrar el mes anterior al actual
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();
    
    lastMonthData.forEach(function(item) {
      var itemDate = new Date(item.date);
      if (itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth - 1) {
        previousBalance = item.endingBalance;
      } else if (currentMonth === 0 && itemDate.getFullYear() === currentYear - 1 && itemDate.getMonth() === 11) {
        previousBalance = item.endingBalance;
      }
    });
  }

  var runningBalance = previousBalance;

  for (var i = 9; i >= 0; i--) {
    var tempDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);

    var year = tempDate.getFullYear();
    var month = String(tempDate.getMonth() + 1).padStart(2, "0");
    var day = String(tempDate.getDate()).padStart(2, "0");
    var formatted = year + "-" + month + "-" + day;

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    var newComm = dailyRecord ? dailyRecord.newCommission : 0;
    var existingComm = dailyRecord ? dailyRecord.existingCommission : 0;
    var paidComm = dailyRecord ? dailyRecord.paid : 0;
    var cancelledComm = dailyRecord ? dailyRecord.cancelled : 0;

    var beginningBalance = runningBalance;
    var endingBalance = beginningBalance + newComm + existingComm - paidComm - cancelledComm;
    runningBalance = endingBalance;

    result.push({
      date: formatted,
      beginningBalance: beginningBalance,
      newCommission: newComm,
      existingCommission: existingComm,
      paid: paidComm,
      cancelled: cancelledComm,
      endingBalance: endingBalance
    });
  }

  return result;
}

/* =========================
   🔥 FORMATEAR MONEDA
========================= */

function formatCommissionValue(value) {
  if (value < 0) {
    return "-$" + Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* =========================
   🔥 RENDER TABLA COMMISSION MENSUAL
========================= */

/* =========================
   🔥 RENDER TABLA COMMISSION MENSUAL (CON COLUMNA YTD) - CORREGIDO
========================= */

function renderCommissionTable(data, filterType) {
  var head = document.getElementById("commissionTableHead");
  var body = document.getElementById("commissionTableBody");

  if (!head || !body) return;

  head.innerHTML = "";
  body.innerHTML = "";

  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var lastYear = currentYear - 1;

  var monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  // 🔥 Calcular YTD (Year to Date) - Solo meses del año actual
  var ytdData = data.filter(function(item) {
    return new Date(item.date).getFullYear() === currentYear;
  });

  var totalYTD = ytdData.reduce(function(sum, item) {
    return {
      newCommission: sum.newCommission + item.newCommission,
      existingCommission: sum.existingCommission + item.existingCommission,
      paid: sum.paid + item.paid,
      cancelled: sum.cancelled + item.cancelled
    };
  }, { newCommission: 0, existingCommission: 0, paid: 0, cancelled: 0 });

  var ytdSorted = ytdData.slice().sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  var ytdBeginning = ytdSorted.length > 0 ? ytdSorted[0].beginningBalance : 0;
  var ytdEnding = ytdSorted.length > 0 ? ytdSorted[ytdSorted.length - 1].endingBalance : 0;

  // 🔥 YEARLY: Solo años con columna YTD
  if (filterType === "yearly") {
    var currentYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === currentYear; 
    });
    var lastYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === lastYear; 
    });

    var currentYearSorted = currentYearData.slice().sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    var lastYearSorted = lastYearData.slice().sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    var totalCurrentYear = currentYearData.reduce(function(sum, item) {
      return {
        newCommission: sum.newCommission + item.newCommission,
        existingCommission: sum.existingCommission + item.existingCommission,
        paid: sum.paid + item.paid,
        cancelled: sum.cancelled + item.cancelled
      };
    }, { newCommission: 0, existingCommission: 0, paid: 0, cancelled: 0 });

    totalCurrentYear.beginningBalance = currentYearSorted.length > 0 ? currentYearSorted[0].beginningBalance : 0;
    totalCurrentYear.endingBalance = currentYearSorted.length > 0 ? currentYearSorted[currentYearSorted.length - 1].endingBalance : 0;

    var totalLastYear = lastYearData.reduce(function(sum, item) {
      return {
        newCommission: sum.newCommission + item.newCommission,
        existingCommission: sum.existingCommission + item.existingCommission,
        paid: sum.paid + item.paid,
        cancelled: sum.cancelled + item.cancelled
      };
    }, { newCommission: 0, existingCommission: 0, paid: 0, cancelled: 0 });

    totalLastYear.beginningBalance = lastYearSorted.length > 0 ? lastYearSorted[0].beginningBalance : 0;
    totalLastYear.endingBalance = lastYearSorted.length > 0 ? lastYearSorted[lastYearSorted.length - 1].endingBalance : 0;

    head.innerHTML = 
      '<tr>' +
        '<th>Commission Type</th>' +
        '<th>YTD</th>' +
        '<th>' + currentYear + '</th>' +
        '<th>' + lastYear + '</th>' +
      '</tr>';

    body.innerHTML = 
      '<tr>' +
        '<td>Beginning Outstanding Balance</td>' +
        '<td><strong>' + formatCommissionValue(ytdBeginning) + '</strong></td>' +
        '<td>' + formatCommissionValue(totalCurrentYear.beginningBalance) + '</td>' +
        '<td>' + formatCommissionValue(totalLastYear.beginningBalance) + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td>New Customer Commissions</td>' +
        '<td><strong>' + formatCommissionValue(totalYTD.newCommission) + '</strong></td>' +
        '<td>' + formatCommissionValue(totalCurrentYear.newCommission) + '</td>' +
        '<td>' + formatCommissionValue(totalLastYear.newCommission) + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Existing Customer Commissions</td>' +
        '<td><strong>' + formatCommissionValue(totalYTD.existingCommission) + '</strong></td>' +
        '<td>' + formatCommissionValue(totalCurrentYear.existingCommission) + '</td>' +
        '<td>' + formatCommissionValue(totalLastYear.existingCommission) + '</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Paid Commission</td>' +
        '<td><strong>' + formatCommissionValue(totalYTD.paid) + '</strong></td>' +
        '<td>' + formatCommissionValue(totalCurrentYear.paid) + '</td>' +
        '<td>' + formatCommissionValue(totalLastYear.paid) + '</td>' +
      '</tr>' +
      '<tr class="cancelled-row">' +
        '<td class="tooltip-cell">Commission reversals <span class="tooltip-icon" data-tooltip="Cancelled orders"><i class="fas fa-info-circle"></i></span></td>' +
        '<td><strong class="cancelled-value">' + formatCommissionValue(totalYTD.cancelled) + '</strong></td>' +
        '<td class="cancelled-value">' + formatCommissionValue(totalCurrentYear.cancelled) + '</td>' +
        '<td class="cancelled-value">' + formatCommissionValue(totalLastYear.cancelled) + '</td>' +
      '</tr>' +
      '<tr class="total-row">' +
        '<td><strong>Ending Outstanding Balance</strong></td>' +
        '<td><strong>' + formatCommissionValue(ytdEnding) + '</strong></td>' +
        '<td><strong>' + formatCommissionValue(totalCurrentYear.endingBalance) + '</strong></td>' +
        '<td><strong>' + formatCommissionValue(totalLastYear.endingBalance) + '</strong></td>' +
      '</tr>';
    return;
  }

  // 🔥 OTROS FILTROS: Por meses con columna YTD
  var sorted = data.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // 🔥 HEADER CON COLUMNA YTD
  var headerRow = "<tr><th>Commission Type</th><th>YTD</th>";
  sorted.forEach(function(item) {
    var parts = item.date.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    
    var isCurrentMonth = (year === currentYear && month === currentMonth);
    var thClass = isCurrentMonth ? 'th-current-month' : '';
    
    if (isCurrentMonth) {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">MTD</span>' +
                     '</div>' +
                   '</th>';
    } else {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">' + monthNames[month - 1] + '</span>' +
                       '<span class="th-year">' + year + '</span>' +
                     '</div>' +
                   '</th>';
    }
  });
  headerRow += "</tr>";

  // 🔥 ROWS CON COLUMNA YTD Y TOOLTIP EN COMMISSION REVERSALS
  var beginningRow = '<tr><td>Beginning Outstanding Balance</td><td><strong>' + formatCommissionValue(ytdBeginning) + '</strong></td>';
  var newCommRow = '<tr><td>New Customer Commissions</td><td><strong>' + formatCommissionValue(totalYTD.newCommission) + '</strong></td>';
  var existingCommRow = '<tr><td>Existing Customer Commissions</td><td><strong>' + formatCommissionValue(totalYTD.existingCommission) + '</strong></td>';
  var paidRow = '<tr><td>Paid Commission</td><td><strong>' + formatCommissionValue(totalYTD.paid) + '</strong></td>';
  var cancelledRow = '<tr class="cancelled-row"><td class="tooltip-cell">Commission reversals <span class="tooltip-icon" data-tooltip="Cancelled orders"><i class="fas fa-info-circle"></i></span></td><td><strong class="cancelled-value">' + formatCommissionValue(totalYTD.cancelled) + '</strong></td>';
  var endingRow = '<tr class="total-row"><td><strong>Ending Outstanding Balance</strong></td><td><strong>' + formatCommissionValue(ytdEnding) + '</strong></td>';

  sorted.forEach(function(item) {
    beginningRow += '<td>' + formatCommissionValue(item.beginningBalance) + '</td>';
    newCommRow += '<td>' + formatCommissionValue(item.newCommission) + '</td>';
    existingCommRow += '<td>' + formatCommissionValue(item.existingCommission) + '</td>';
    paidRow += '<td>' + formatCommissionValue(item.paid) + '</td>';
    cancelledRow += '<td class="cancelled-value">' + formatCommissionValue(item.cancelled) + '</td>';
    endingRow += '<td><strong>' + formatCommissionValue(item.endingBalance) + '</strong></td>';
  });

  head.innerHTML = headerRow;
  body.innerHTML = beginningRow + '</tr>' + 
                   newCommRow + '</tr>' + 
                   existingCommRow + '</tr>' + 
                   paidRow + '</tr>' + 
                   cancelledRow + '</tr>' + 
                   endingRow + '</tr>';
}

/* =========================
   🔥 RENDER TABLA COMMISSION DIARIA (CON TOOLTIP)
========================= */
function renderCommissionDailyTable(data, filterType) {
  var head = document.getElementById("commissionTableHead");
  var body = document.getElementById("commissionTableBody");

  if (!head || !body) return;

  head.innerHTML = "";
  body.innerHTML = "";

  var now = new Date();
  var todayStr = now.getFullYear() + '-' + 
                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                 String(now.getDate()).padStart(2, '0');

  var sorted = data.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // 🔥 Calcular totales generales
  var totals = sorted.reduce(function(sum, item) {
    return {
      newCommission: sum.newCommission + item.newCommission,
      existingCommission: sum.existingCommission + item.existingCommission,
      paid: sum.paid + item.paid,
      cancelled: sum.cancelled + item.cancelled
    };
  }, { newCommission: 0, existingCommission: 0, paid: 0, cancelled: 0 });

  // 🔥 Obtener beginning balance del primer día y ending balance del último día
  var firstDayData = data.slice().sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  })[0];
  
  var lastDayData = sorted[0]; // El más reciente

  // 🔥 HEADER CON COLUMNA TOTAL
  var headerRow = "<tr><th>COMMISSION SUMMARY</th><th>MTD</th>";
  sorted.forEach(function(item) {
    var date = new Date(item.date + "T00:00:00");
    var dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    var monthName = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    var dayNum = date.getDate();
    var year = date.getFullYear();
    
    var isToday = (item.date === todayStr);
    var thClass = isToday ? 'th-current-month' : '';
    
    if (isToday) {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">TODAY</span>' +
                     '</div>' +
                   '</th>';
    } else {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">' + dayName + ' ' + monthName + '</span>' +
                       '<span class="th-year">' + dayNum + ', ' + year + '</span>' +
                     '</div>' +
                   '</th>';
    }
  });
  headerRow += "</tr>";

  // 🔥 ROWS CON COLUMNA TOTAL Y TOOLTIP EN COMMISSION REVERSALS
  var beginningRow = '<tr><td>Beginning Outstanding Balance</td><td><strong>' + formatCommissionValue(firstDayData ? firstDayData.beginningBalance : 0) + '</strong></td>';
  var newCommRow = '<tr><td>New Customer Commissions</td><td><strong>' + formatCommissionValue(totals.newCommission) + '</strong></td>';
  var existingCommRow = '<tr><td>Existing Customer Commissions</td><td><strong>' + formatCommissionValue(totals.existingCommission) + '</strong></td>';
  var paidRow = '<tr><td>Paid Commission</td><td><strong>' + formatCommissionValue(totals.paid) + '</strong></td>';
  var cancelledRow = '<tr class="cancelled-row"><td class="tooltip-cell">Commission reversals <span class="tooltip-icon" data-tooltip="Cancelled orders"><i class="fas fa-info-circle"></i></span></td><td><strong class="cancelled-value">' + formatCommissionValue(totals.cancelled) + '</strong></td>';
  var endingRow = '<tr class="total-row"><td><strong>Ending Outstanding Balance</strong></td><td><strong>' + formatCommissionValue(lastDayData ? lastDayData.endingBalance : 0) + '</strong></td>';

  sorted.forEach(function(item) {
    beginningRow += '<td>' + formatCommissionValue(item.beginningBalance) + '</td>';
    newCommRow += '<td>' + formatCommissionValue(item.newCommission) + '</td>';
    existingCommRow += '<td>' + formatCommissionValue(item.existingCommission) + '</td>';
    paidRow += '<td>' + formatCommissionValue(item.paid) + '</td>';
    cancelledRow += '<td class="cancelled-value">' + formatCommissionValue(item.cancelled) + '</td>';
    endingRow += '<td><strong>' + formatCommissionValue(item.endingBalance) + '</strong></td>';
  });

  head.innerHTML = headerRow;
  body.innerHTML = beginningRow + '</tr>' + 
                   newCommRow + '</tr>' + 
                   existingCommRow + '</tr>' + 
                   paidRow + '</tr>' + 
                   cancelledRow + '</tr>' + 
                   endingRow + '</tr>';
}


/* =========================
   🔥 COMMISSION CHART
========================= */

function updateCommissionChart(data, filterType) {
  if (!filterType) {
    filterType = commissionCurrentFilter;
  }

  if (!data || data.length === 0) {
    if (filterType === "currentMonth" || filterType === "previousMonth") {
      data = dailyCommissionData;
    } else {
      data = filteredCommissionData;
    }
  }

  if (!data || data.length === 0) return;

  var ctx = document.getElementById("commissionChart");
  if (!ctx) return;

  if (typeof Chart === "undefined") return;

  var showEnding = document.getElementById("chartCommissionEnding")?.checked ?? true;
  var showNew = document.getElementById("chartCommissionNew")?.checked ?? false;
  var showExisting = document.getElementById("chartCommissionExisting")?.checked ?? false;
  var showPaid = document.getElementById("chartCommissionPaid")?.checked ?? false;
  var showCancelled = document.getElementById("chartCommissionCancelled")?.checked ?? false;

  var labels = [];
  var dataEnding = [];
  var dataNew = [];
  var dataExisting = [];
  var dataPaid = [];
  var dataCancelled = [];

  var monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var lastYear = currentYear - 1;

  var todayStr = now.getFullYear() + '-' + 
                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                 String(now.getDate()).padStart(2, '0');

  // 🔥 YEARLY
  if (filterType === "yearly") {
    var currentYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === currentYear; 
    });
    var lastYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === lastYear; 
    });

    var currentTotals = currentYearData.reduce(function(sum, item) {
      return {
        newCommission: sum.newCommission + item.newCommission,
        existingCommission: sum.existingCommission + item.existingCommission,
        paid: sum.paid + item.paid,
        cancelled: sum.cancelled + item.cancelled,
        endingBalance: currentYearData.length > 0 ? currentYearData[currentYearData.length - 1].endingBalance : 0
      };
    }, { newCommission: 0, existingCommission: 0, paid: 0, cancelled: 0, endingBalance: 0 });

    var lastTotals = lastYearData.reduce(function(sum, item) {
      return {
        newCommission: sum.newCommission + item.newCommission,
        existingCommission: sum.existingCommission + item.existingCommission,
        paid: sum.paid + item.paid,
        cancelled: sum.cancelled + item.cancelled,
        endingBalance: lastYearData.length > 0 ? lastYearData[lastYearData.length - 1].endingBalance : 0
      };
    }, { newCommission: 0, existingCommission: 0, paid: 0, cancelled: 0, endingBalance: 0 });

    labels = [String(currentYear), String(lastYear)];
    dataNew = [currentTotals.newCommission, lastTotals.newCommission];
    dataExisting = [currentTotals.existingCommission, lastTotals.existingCommission];
    dataPaid = [currentTotals.paid, lastTotals.paid];
    dataCancelled = [currentTotals.cancelled, lastTotals.cancelled];
    dataEnding = [currentTotals.endingBalance, lastTotals.endingBalance];

  // 🔥 DAILY (Current Month o Previous Month)
  } else if (filterType === "currentMonth" || filterType === "previousMonth") {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var isToday = (item.date === todayStr);
      var date = new Date(item.date + "T00:00:00");
      var dayNum = date.getDate();
      var monthName = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
      
      if (isToday) {
        labels.push("TODAY");
      } else {
        labels.push(dayNum + " " + monthName);
      }
      
      dataNew.push(item.newCommission);
      dataExisting.push(item.existingCommission);
      dataPaid.push(item.paid);
      dataCancelled.push(item.cancelled);
      dataEnding.push(item.endingBalance);
    });

      // En la sección de MONTHLY, agregar ytd
  } else if (filterType === "lastYear" || filterType === "sixMonths" || filterType === "ytd") {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var parts = item.date.split("-");
      var year = parseInt(parts[0]);
      var month = parseInt(parts[1]);
      
      var isCurrentMonth = (year === currentYear && month === currentMonth);
      
      if (isCurrentMonth) {
        labels.push("MTD");
      } else {
        labels.push([monthNames[month - 1], year]);
      }
      
      dataNew.push(item.newCommission);
      dataExisting.push(item.existingCommission);
      dataPaid.push(item.paid);
      dataCancelled.push(item.cancelled);
      dataEnding.push(item.endingBalance);
    });
  

  // 🔥 MONTHLY
  } else {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var parts = item.date.split("-");
      var year = parseInt(parts[0]);
      var month = parseInt(parts[1]);
      
      var isCurrentMonth = (year === currentYear && month === currentMonth);
      
      if (isCurrentMonth) {
        labels.push("MTD");
      } else {
        labels.push([monthNames[month - 1], year]);
      }
      
      dataNew.push(item.newCommission);
      dataExisting.push(item.existingCommission);
      dataPaid.push(item.paid);
      dataCancelled.push(item.cancelled);
      dataEnding.push(item.endingBalance);
    });
  }

  var datasets = [];

  if (showEnding) {
    datasets.push({
      label: "Ending Balance",
      data: dataEnding,
      backgroundColor: "#ACA68B",
      borderColor: "#ACA68B",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showNew) {
    datasets.push({
      label: "New Customer Commissions",
      data: dataNew,
      backgroundColor: "#5A348A",
      borderColor: "#5A348A",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showExisting) {
    datasets.push({
      label: "Existing Customer Commissions",
      data: dataExisting,
      backgroundColor: "#313943",
      borderColor: "#313943",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showPaid) {
    datasets.push({
      label: "Commissions Paid",
      data: dataPaid,
      backgroundColor: "#1B2C3A",
      borderColor: "#1B2C3A",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showCancelled) {
    datasets.push({
      label: "Commission reversals",
      data: dataCancelled,
      backgroundColor: "#C43B1D",
      borderColor: "#C43B1D",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (datasets.length === 0) {
    datasets.push({
      label: "Ending Balance",
      data: dataEnding,
      backgroundColor: "#ACA68B",
      borderColor: "#ACA68B",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (commissionChart) {
    commissionChart.destroy();
    commissionChart = null;
  }

  commissionChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 15,
            font: { size: 11, weight: "500" },
            color: "#1E2227"
          }
        },
        tooltip: {
          backgroundColor: "#07070C",
          titleColor: "#FEFEFE",
          bodyColor: "#E8E9E9",
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title: function(context) {
              var label = context[0].label;
              if (Array.isArray(label)) {
                return label.join(" ");
              }
              return label;
            },
            label: function(context) {
              var value = context.raw;
              return " " + context.dataset.label + ": " + formatCommissionValue(value);
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { 
            font: { size: 9, weight: "500" }, 
            color: "#535255",
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: "#E8E9E9" },
          ticks: {
            font: { size: 11 },
            color: "#535255",
            callback: function(value) {
              return "$" + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}




/* =========================
   🔥 PAYMENTS - VARIABLES
========================= */

var paymentCurrentFilter = "lastYear";
var filteredPaymentData = [];
var dailyPaymentData = [];
var paymentChart = null;

/* =========================
   🔥 INICIALIZAR PAYMENTS
========================= */

function initPayments() {
  applyPaymentFilter("lastYear");
}

/* =========================
   🔥 AGRUPAR PAGOS POR MES
========================= */

function groupPaymentsByMonth(data) {
  var grouped = data.reduce(function(acc, item) {
    var parts = item.date.split("-");
    var year = parts[0];
    var month = parts[1];
    var monthKey = year + "-" + month + "-01";

    if (!acc[monthKey]) {
      acc[monthKey] = { 
        date: monthKey, 
        paid: 0,
        declined: 0
      };
    }

    acc[monthKey].paid += item.paid || 0;
    acc[monthKey].declined += item.cancelled || 0;

    return acc;
  }, {});

  return Object.values(grouped).sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
}

/* =========================
   🔥 APLICAR FILTRO PAYMENTS
========================= */

function applyPaymentFilter(filterType) {
  paymentCurrentFilter = filterType;

  var container = document.getElementById("paymentHistoryFilters");
  
  if (container) {
    var buttons = container.querySelectorAll(".filter-btn[data-filter]");
    buttons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    var activeBtn = container.querySelector('[data-filter="' + filterType + '"]');
    if (activeBtn) activeBtn.classList.add("active");
  }

  // 🔥 CURRENT MONTH - Todos los días del mes actual
  if (filterType === "currentMonth") {
    dailyPaymentData = generateCurrentMonthPaymentData(commissionData);
    renderPaymentDailyTable(dailyPaymentData, filterType);
    updatePaymentChart(dailyPaymentData, filterType);
    return;
  }

  // 🔥 PREVIOUS MONTH - Todos los días del mes anterior
  if (filterType === "previousMonth") {
    dailyPaymentData = generatePreviousMonthPaymentData(commissionData);
    renderPaymentDailyTable(dailyPaymentData, filterType);
    updatePaymentChart(dailyPaymentData, filterType);
    return;
  }

  // 🔥 Limpiar datos diarios
  dailyPaymentData = [];

  var filtered = filterPaymentsByDate(commissionData, filterType);
  filteredPaymentData = groupPaymentsByMonth(filtered);

  renderPaymentTable(filteredPaymentData, filterType);
  updatePaymentChart(filteredPaymentData, filterType);
}


function generateCurrentMonthPaymentData(data) {
  var result = [];
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  
  // Generar datos desde el día 1 hasta hoy
  var endDay = today.getDate();
  
  for (var day = 1; day <= endDay; day++) {
    var formatted = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    result.push({
      date: formatted,
      paid: dailyRecord ? dailyRecord.paid : 0,
      declined: dailyRecord ? dailyRecord.cancelled : 0
    });
  }

  return result;
}

function generateFullMonthPaymentData(data) {
  var result = [];
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  
  // Obtener el último día del mes actual
  var lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  
  // Generar datos para cada día del mes (desde el día 1 hasta hoy o el último día)
  var endDay = Math.min(today.getDate(), lastDayOfMonth);
  
  for (var day = 1; day <= endDay; day++) {
    var formatted = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    result.push({
      date: formatted,
      paid: dailyRecord ? dailyRecord.paid : 0,
      declined: dailyRecord ? dailyRecord.cancelled : 0
    });
  }

  return result;
}

function generatePreviousMonthPaymentData(data) {
  var result = [];
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth(); // Mes actual (0-11)
  
  // Calcular mes anterior
  var prevMonth = month - 1;
  var prevYear = year;
  
  if (prevMonth < 0) {
    prevMonth = 11; // Diciembre
    prevYear = year - 1;
  }
  
  // Obtener el último día del mes anterior
  var lastDayOfPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
  // Generar datos para cada día del mes anterior
  for (var day = 1; day <= lastDayOfPrevMonth; day++) {
    var formatted = prevYear + "-" + String(prevMonth + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    result.push({
      date: formatted,
      paid: dailyRecord ? dailyRecord.paid : 0,
      declined: dailyRecord ? dailyRecord.cancelled : 0
    });
  }

  return result;
}


/* =========================
   🔥 FILTRAR PAYMENTS POR FECHA
========================= */

function filterPaymentsByDate(data, filterType) {
  var now = new Date();

  return data.filter(function(item) {
    var parts = item.date.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]) || 1;
    var itemDate = new Date(year, month - 1, day);

    switch (filterType) {
      case "yearly":
        var currentYear = now.getFullYear();
        var lastYear = currentYear - 1;
        return itemDate.getFullYear() === currentYear || itemDate.getFullYear() === lastYear;

      case "lastYear":
        var thirteenMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
        return itemDate >= thirteenMonthsAgo;

      case "ytd":
        // 🔥 Year to Date: Desde Enero hasta el mes actual del año actual
        var currentYear = now.getFullYear();
        var startOfYear = new Date(currentYear, 0, 1);
        return itemDate >= startOfYear && itemDate.getFullYear() === currentYear;

      case "sixMonths":
        var sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        return itemDate >= sixMonthsAgo;

      default:
        return true;
    }
  });
}

/* =========================
   🔥 GENERAR DATA DIARIA PAYMENTS (CURRENT MONTH)
========================= */

function generateDailyPaymentData(data, daysCount) {
  var result = [];
  var today = new Date();
  var count = daysCount || 10;

  for (var i = 0; i < count; i++) {
    var tempDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);

    var year = tempDate.getFullYear();
    var month = String(tempDate.getMonth() + 1).padStart(2, "0");
    var day = String(tempDate.getDate()).padStart(2, "0");
    var formatted = year + "-" + month + "-" + day;

    var dailyRecord = data.find(function(item) {
      return item.date === formatted;
    });

    result.push({
      date: formatted,
      paid: dailyRecord ? dailyRecord.paid : 0,
      declined: dailyRecord ? dailyRecord.cancelled : 0
    });
  }

  return result;
}


/* =========================
   🔥 FORMATEAR MONEDA PAYMENT
========================= */

function formatPaymentValue(value) {
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* =========================
   🔥 RENDER TABLA PAYMENT MENSUAL
========================= */

/* =========================
   🔥 RENDER TABLA PAYMENT MENSUAL (CON COLUMNA YTD) - CORREGIDO
========================= */

function renderPaymentTable(data, filterType) {
  var head = document.getElementById("paymentHistoryHead");
  var body = document.getElementById("paymentHistoryBody");

  if (!head || !body) return;

  head.innerHTML = "";
  body.innerHTML = "";

  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var lastYear = currentYear - 1;

  var monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  // 🔥 Calcular YTD (Year to Date) - Solo meses del año actual
  var ytdData = data.filter(function(item) {
    return new Date(item.date).getFullYear() === currentYear;
  });

  var totalYTD = ytdData.reduce(function(sum, item) {
    return {
      paid: 9600,
      declined: 350.00
    };
  }, { paid: 0, declined: 0 });

  // 🔥 YEARLY: Solo años con columna YTD
  if (filterType === "yearly") {
    var currentYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === currentYear; 
    });
    var lastYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === lastYear; 
    });

    var totalCurrentYear = currentYearData.reduce(function(sum, item) {
      return {
        paid: sum.paid + item.paid,
        declined: sum.declined + item.declined
      };
    }, { paid: 0, declined: 0 });

    var totalLastYear = lastYearData.reduce(function(sum, item) {
      return {
        paid: sum.paid + item.paid,
        declined: sum.declined + item.declined
      };
    }, { paid: 0, declined: 0 });

    // 🔥 Total = Paid - Declined
    var ytdTotal = totalYTD.paid - totalYTD.declined;
    var currentYearTotal = totalCurrentYear.paid - totalCurrentYear.declined;
    var lastYearTotal = totalLastYear.paid - totalLastYear.declined;

    head.innerHTML = 
      '<tr>' +
        '<th>STATUS</th>' +
        '<th>YTD</th>' +
        '<th>' + currentYear + '</th>' +
        '<th>' + lastYear + '</th>' +
      '</tr>';

    body.innerHTML = 
      '<tr>' +
        '<td><span class="status-dot status-paid"></span> Paid Commission</td>' +
        '<td><strong>' + formatPaymentValue(totalYTD.paid) + '</strong></td>' +
        '<td class="clickable-cell" onclick="openPaymentModal(\'' + currentYear + '\', \'paid\', \'yearly\')">' + formatPaymentValue(totalCurrentYear.paid) + '</td>' +
        '<td class="clickable-cell" onclick="openPaymentModal(\'' + lastYear + '\', \'paid\', \'yearly\')">' + formatPaymentValue(totalLastYear.paid) + '</td>' +
      '</tr>' +
      
     
      '<tr class="declined-row">' +
        '<td><span class="status-dot status-declined"></span> Declined</td>' +
        '<td><strong class="declined-value">' + formatPaymentValue(totalYTD.declined) + '</strong></td>' +
        '<td class="clickable-cell declined-value" onclick="openPaymentModal(\'' + currentYear + '\', \'declined\', \'yearly\')">' + formatPaymentValue(totalCurrentYear.declined) + '</td>' +
        '<td class="clickable-cell declined-value" onclick="openPaymentModal(\'' + lastYear + '\', \'declined\', \'yearly\')">' + formatPaymentValue(totalLastYear.declined) + '</td>' +
      '</tr>' +
      '<tr class="total-row">' +
        '<td><strong>Net Paid Commission</strong></td>' +
        '<td><strong>' + formatPaymentValue(ytdTotal) + '</strong></td>' +
        '<td class="clickable-cell" onclick="openPaymentModal(\'' + currentYear + '\', \'all\', \'yearly\')"><strong>' + formatPaymentValue(currentYearTotal) + '</strong></td>' +
        '<td class="clickable-cell" onclick="openPaymentModal(\'' + lastYear + '\', \'all\', \'yearly\')"><strong>' + formatPaymentValue(lastYearTotal) + '</strong></td>' +
      '</tr>';
    return;
  }

  // 🔥 OTROS FILTROS: Por meses con columna YTD
  var sorted = data.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // 🔥 Total YTD = Paid - Declined
  var ytdTotal = totalYTD.paid - totalYTD.declined;

  // 🔥 HEADER CON COLUMNA YTD
  var headerRow = "<tr><th>STATUS</th><th>YTD</th>";
  sorted.forEach(function(item) {
    var parts = item.date.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    
    var isCurrentMonth = (year === currentYear && month === currentMonth);
    var thClass = isCurrentMonth ? 'th-current-month' : '';
    
    if (isCurrentMonth) {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">MTD</span>' +
                     '</div>' +
                   '</th>';
    } else {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">' + monthNames[month - 1] + '</span>' +
                       '<span class="th-year">' + year + '</span>' +
                     '</div>' +
                   '</th>';
    }
  });
  headerRow += "</tr>";

  // 🔥 ROWS CON COLUMNA YTD
  var paidRow = '<tr><td><span class="status-dot status-paid"></span> Success Paid</td><td><strong>' + formatPaymentValue(totalYTD.paid) + '</strong></td>';
  var declinedRow = '<tr class="declined-row"><td><span class="status-dot status-declined"></span> Declined</td><td><strong class="declined-value">' + formatPaymentValue(totalYTD.declined) + '</strong></td>';
  var totalRow = '<tr class="total-row"><td><strong>Total</strong></td><td><strong>' + formatPaymentValue(ytdTotal) + '</strong></td>';

  sorted.forEach(function(item) {
    // 🔥 Total por mes = Paid - Declined
    var itemTotal = item.paid - item.declined;
    var dateParam = item.date;
    
    paidRow += '<td class="clickable-cell" onclick="openPaymentModal(\'' + dateParam + '\', \'paid\', \'' + filterType + '\')">' + formatPaymentValue(item.paid) + '</td>';
    declinedRow += '<td class="clickable-cell declined-value" onclick="openPaymentModal(\'' + dateParam + '\', \'declined\', \'' + filterType + '\')">' + formatPaymentValue(item.declined) + '</td>';
    totalRow += '<td class="clickable-cell" onclick="openPaymentModal(\'' + dateParam + '\', \'all\', \'' + filterType + '\')"><strong>' + formatPaymentValue(itemTotal) + '</strong></td>';
  });

  head.innerHTML = headerRow;
  body.innerHTML = paidRow + '</tr>' + 
                   declinedRow + '</tr>' + 
                   totalRow + '</tr>';
}




/* =========================
   🔥 RENDER TABLA PAYMENT DIARIA
========================= */

function renderPaymentDailyTable(data, filterType) {
  var head = document.getElementById("paymentHistoryHead");
  var body = document.getElementById("paymentHistoryBody");

  if (!head || !body) return;

  head.innerHTML = "";
  body.innerHTML = "";

  var now = new Date();
  var todayStr = now.getFullYear() + '-' + 
                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                 String(now.getDate()).padStart(2, '0');

  var sorted = data.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // 🔥 Calcular totales generales
  var totals = sorted.reduce(function(sum, item) {
    return {
      paid: sum.paid + item.paid,
      declined: sum.declined + item.declined
    };
  }, { paid: 0, declined: 0 });

  // 🔥 Total = Paid - Declined
  var grandTotal = totals.paid - totals.declined;

  // 🔥 HEADER CON COLUMNA TOTAL
  var headerRow = "<tr><th>STATUS</th><th>TOTAL</th>";
  sorted.forEach(function(item) {
    var date = new Date(item.date + "T00:00:00");
    var dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    var monthName = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    var dayNum = date.getDate();
    var year = date.getFullYear();
    
    var isToday = (item.date === todayStr);
    var thClass = isToday ? 'th-current-month' : '';
    
    if (isToday) {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">TODAY</span>' +
                     '</div>' +
                   '</th>';
    } else {
      headerRow += '<th class="' + thClass + '">' +
                     '<div class="th-content">' +
                       '<span class="th-month">' + dayName + ' ' + monthName + '</span>' +
                       '<span class="th-year">' + dayNum + ', ' + year + '</span>' +
                     '</div>' +
                   '</th>';
    }
  });
  headerRow += "</tr>";

  // 🔥 ROWS CON COLUMNA TOTAL
  var currentFilterType = filterType || paymentCurrentFilter;
  
  var paidRow = '<tr><td><span class="status-dot status-paid"></span> Success Paid</td><td><strong>' + formatPaymentValue(totals.paid) + '</strong></td>';
  var declinedRow = '<tr class="declined-row"><td><span class="status-dot status-declined"></span> Declined</td><td><strong class="declined-value">-' + formatPaymentValue(totals.declined) + '</strong></td>';
  var totalRow = '<tr class="total-row"><td><strong>Total</strong></td><td><strong>' + formatPaymentValue(grandTotal) + '</strong></td>';

  sorted.forEach(function(item) {
    // 🔥 Total por día = Paid - Declined
    var itemTotal = item.paid - item.declined;
    var dateParam = item.date;
    
    paidRow += '<td class="clickable-cell" onclick="openPaymentModal(\'' + dateParam + '\', \'paid\', \'' + currentFilterType + '\')">' + formatPaymentValue(item.paid) + '</td>';
    declinedRow += '<td class="clickable-cell declined-value" onclick="openPaymentModal(\'' + dateParam + '\', \'declined\', \'' + currentFilterType + '\')">-' + formatPaymentValue(item.declined) + '</td>';
    totalRow += '<td class="clickable-cell" onclick="openPaymentModal(\'' + dateParam + '\', \'all\', \'' + currentFilterType + '\')"><strong>' + formatPaymentValue(itemTotal) + '</strong></td>';
  });

  head.innerHTML = headerRow;
  body.innerHTML = paidRow + '</tr>' + 
                   declinedRow + '</tr>' + 
                   totalRow + '</tr>';
}

/* =========================
   🔥 PAYMENT CHART
========================= */
function updatePaymentChart(data, filterType) {
  if (!filterType) {
    filterType = paymentCurrentFilter;
  }

  if (!data || data.length === 0) {
    if (filterType === "last10Days" || filterType === "previousMonth") {
      data = dailyPaymentData;
    } else {
      data = filteredPaymentData;
    }
  }

  if (!data || data.length === 0) return;

  var ctx = document.getElementById("paymentGroupedChart");
  if (!ctx) return;

  if (typeof Chart === "undefined") return;

  var showTotal = document.getElementById("chartPaymentTotal")?.checked ?? true;
  var showPaid = document.getElementById("chartPaymentPaid")?.checked ?? false;
  var showDeclined = document.getElementById("chartPaymentDeclined")?.checked ?? false;

  var labels = [];
  var dataTotal = [];
  var dataPaid = [];
  var dataDeclined = [];

  var monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth() + 1;
  var lastYear = currentYear - 1;

  var todayStr = now.getFullYear() + '-' + 
                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                 String(now.getDate()).padStart(2, '0');

  // 🔥 YEARLY
  if (filterType === "yearly") {
    var currentYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === currentYear; 
    });
    var lastYearData = data.filter(function(item) { 
      return new Date(item.date).getFullYear() === lastYear; 
    });

    var totalCurrentYear = currentYearData.reduce(function(sum, item) {
      return {
        paid: sum.paid + item.paid,
        declined: sum.declined + item.declined
      };
    }, { paid: 0, declined: 0 });

    var totalLastYear = lastYearData.reduce(function(sum, item) {
      return {
        paid: sum.paid + item.paid,
        declined: sum.declined + item.declined
      };
    }, { paid: 0, declined: 0 });

    labels = [String(currentYear), String(lastYear)];
    dataPaid = [totalCurrentYear.paid, totalLastYear.paid];
    dataDeclined = [totalCurrentYear.declined, totalLastYear.declined];
    dataTotal = [
      totalCurrentYear.paid + totalCurrentYear.declined,
      totalLastYear.paid + totalLastYear.declined
    ];

  // 🔥 DAILY (Current Month o Previous Month)
  } else if (filterType === "last10Days" || filterType === "previousMonth") {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var isToday = (item.date === todayStr);
      var date = new Date(item.date + "T00:00:00");
      var dayNum = date.getDate();
      var monthName = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
      
      if (isToday) {
        labels.push("TODAY");
      } else {
        // Formato corto para que quepan todos los días
        labels.push(dayNum + " " + monthName);
      }
      
      dataPaid.push(item.paid);
      dataDeclined.push(item.declined);
      dataTotal.push(item.paid + item.declined);
    });


    } else if (filterType === "lastYear" || filterType === "sixMonths" || filterType === "ytd") {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var parts = item.date.split("-");
      var year = parseInt(parts[0]);
      var month = parseInt(parts[1]);
      
      var isCurrentMonth = (year === currentYear && month === currentMonth);
      
      if (isCurrentMonth) {
        labels.push("MTD");
      } else {
        labels.push([monthNames[month - 1], year]);
      }
      
      dataPaid.push(item.paid);
      dataDeclined.push(item.declined);
      dataTotal.push(item.paid + item.declined);
    });
  


  // 🔥 MONTHLY
  } else {
    var sorted = data.slice().sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    sorted.forEach(function(item) {
      var parts = item.date.split("-");
      var year = parseInt(parts[0]);
      var month = parseInt(parts[1]);
      
      var isCurrentMonth = (year === currentYear && month === currentMonth);
      
      if (isCurrentMonth) {
        labels.push("MTD");
      } else {
        labels.push([monthNames[month - 1], year]);
      }
      
      dataPaid.push(item.paid);
      dataDeclined.push(item.declined);
      dataTotal.push(item.paid + item.declined);
    });
  }

  var datasets = [];

  if (showTotal) {
    datasets.push({
      label: "Total",
      data: dataTotal,
      backgroundColor: "#ACA68B",
      borderColor: "#ACA68B",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showPaid) {
    datasets.push({
      label: "Success Paid",
      data: dataPaid,
      backgroundColor: "#1B2C3A",
      borderColor: "#1B2C3A",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (showDeclined) {
    datasets.push({
      label: "Declined",
      data: dataDeclined,
      backgroundColor: "#C43B1D",
      borderColor: "#C43B1D",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (datasets.length === 0) {
    datasets.push({
      label: "Total",
      data: dataTotal,
      backgroundColor: "#ACA68B",
      borderColor: "#ACA68B",
      borderWidth: 2,
      borderRadius: 6
    });
  }

  if (paymentChart) {
    paymentChart.destroy();
    paymentChart = null;
  }

  paymentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 15,
            font: { size: 12, weight: "500" },
            color: "#1E2227"
          }
        },
        tooltip: {
          backgroundColor: "#07070C",
          titleColor: "#FEFEFE",
          bodyColor: "#E8E9E9",
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title: function(context) {
              var label = context[0].label;
              if (Array.isArray(label)) {
                return label.join(" ");
              }
              return label;
            },
            label: function(context) {
              var value = context.raw;
              return " " + context.dataset.label + ": " + formatPaymentValue(value);
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { 
            font: { size: 9, weight: "500" }, 
            color: "#535255",
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: "#E8E9E9" },
          ticks: {
            font: { size: 11 },
            color: "#535255",
            callback: function(value) {
              return "$" + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}







/* =========================
   🔥 MODAL FUNCTIONS
========================= */

function openPaymentModal(date, status, filterType) {
  var modal = document.getElementById("paymentDetailModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalBody = document.getElementById("modalTableBody");
  var modalTotalSales = document.getElementById("modalTotalSales");
  var modalTotalCommission = document.getElementById("modalTotalCommission");

  if (!modal || !modalBody) return;

  // Determinar el título según el status
  var statusTitle = "";
  if (status === "paid") {
    statusTitle = "Paid Commissions";
  } else if (status === "declined") {
    statusTitle = "Declined Commissions";
  } else {
    statusTitle = "All Commissions";
  }

  // Formatear fecha para el título
  var dateTitle = formatModalDate(date, filterType);
  modalTitle.textContent = statusTitle + " - " + dateTitle;

  // Filtrar transacciones por fecha y status
  var filteredTransactions = filterTransactions(date, status, filterType);

  // Renderizar la tabla
  modalBody.innerHTML = "";

  if (filteredTransactions.length === 0) {
    modalBody.innerHTML = 
      '<tr>' +
        '<td colspan="6" class="empty-state">' +
          '<i class="fas fa-inbox"></i>' +
          'No transactions found for this period' +
        '</td>' +
      '</tr>';
    modalTotalSales.innerHTML = "<strong>$0.00</strong>";
    modalTotalCommission.innerHTML = "<strong>$0.00</strong>";
  } else {
    var totalSales = 0;
    var totalCommission = 0;

    filteredTransactions.forEach(function(item) {
      var formattedDate = formatTransactionDate(item.date);
      var statusBadgeClass = item.status === "paid" ? "status-paid" : "status-declined";
      var statusLabel = item.status === "paid" ? "Paid" : "Declined";

      var row = '<tr>' +
        '<td>' + formattedDate + '</td>' +
        '<td><strong>' + item.orderNumber + '</strong></td>' +
        '<td>$' + item.totalSales.toLocaleString("en-US", { minimumFractionDigits: 2 }) + '</td>' +
        '<td>' + item.commissionRate + '%</td>' +
        '<td>$' + item.commission.toLocaleString("en-US", { minimumFractionDigits: 2 }) + '</td>' +
        '<td><span class="status-badge ' + statusBadgeClass + '">' + statusLabel + '</span></td>' +
      '</tr>';

      modalBody.innerHTML += row;

      totalSales += item.totalSales;
      totalCommission += item.commission;
    });

    modalTotalSales.innerHTML = "<strong>$" + totalSales.toLocaleString("en-US", { minimumFractionDigits: 2 }) + "</strong>";
    modalTotalCommission.innerHTML = "<strong>$" + totalCommission.toLocaleString("en-US", { minimumFractionDigits: 2 }) + "</strong>";
  }

  // Mostrar modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePaymentModal(event) {
  if (event && event.target !== event.currentTarget) return;
  
  var modal = document.getElementById("paymentDetailModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function filterTransactions(date, status, filterType) {
  return transactionsData.filter(function(item) {
    var itemDate = item.date;
    var itemStatus = item.status;

    // Filtrar por status
    if (status && status !== "all") {
      if (status === "declined" && itemStatus !== "declined") return false;
      if (status === "paid" && itemStatus !== "paid") return false;
    }

    // Filtrar por fecha según el tipo de filtro
    if (filterType === "yearly") {
      var year = parseInt(date);
      var itemYear = new Date(itemDate).getFullYear();
      return itemYear === year;
    } else if (filterType === "last10Days") {
      // Filtrar por día específico
      return itemDate === date;
    } else {
      // Filtrar por mes (lastYear, sixMonths)
      var parts = date.split("-");
      var filterYear = parts[0];
      var filterMonth = parts[1];
      
      var itemParts = itemDate.split("-");
      var itemYear = itemParts[0];
      var itemMonth = itemParts[1];
      
      return itemYear === filterYear && itemMonth === filterMonth;
    }
  });
}

function formatModalDate(date, filterType) {
  var monthNames = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];

  if (filterType === "yearly") {
    return date; // Solo el año
  } else if (filterType === "last10Days") {
    var d = new Date(date + "T00:00:00");
    return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  } else {
    var parts = date.split("-");
    var year = parts[0];
    var month = parseInt(parts[1]) - 1;
    return monthNames[month] + " " + year;
  }
}

function formatTransactionDate(dateString) {
  var date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  });
}

// Cerrar modal con ESC
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closePaymentModal();
  }
});
