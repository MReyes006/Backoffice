(function () {
  'use strict';

  var LIBS = {
    jspdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    autotable: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js',
    xlsx: 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
  };

  var injectedStyleId = 'table-export-shared-style';
  var modalId = 'tableExportEmailModal';

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.dataset.loaded === '1') {
          resolve();
          return;
        }
        existing.addEventListener('load', function () { resolve(); }, { once: true });
        existing.addEventListener('error', function () { reject(new Error('Failed to load ' + src)); }, { once: true });
        return;
      }

      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.addEventListener('load', function () {
        s.dataset.loaded = '1';
        resolve();
      }, { once: true });
      s.addEventListener('error', function () {
        reject(new Error('Failed to load ' + src));
      }, { once: true });
      document.head.appendChild(s);
    });
  }

  function ensureStyles() {
    if (document.getElementById(injectedStyleId)) return;

    var style = document.createElement('style');
    style.id = injectedStyleId;
    style.textContent = [
      '.table-export-controls{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;margin:0 0 12px 0;}',
      '.table-export-btn{display:flex;align-items:center;gap:6px;padding:9px 14px;border:1px solid #dbd7ce;background:#fff;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:#535255;transition:all .2s;white-space:nowrap;}',
      '.table-export-btn:hover{border-color:#B8860B;color:#B8860B;}',
      '.table-export-email-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;z-index:9999;padding:16px;}',
      '.table-export-email-overlay.open{display:flex;}',
      '.table-export-email-box{width:min(560px,96vw);background:#fff;border-radius:14px;border:1px solid #e8e1d3;box-shadow:0 16px 40px rgba(0,0,0,.25);overflow:hidden;}',
      '.table-export-email-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #f0ece2;background:#fcfbf8;}',
      '.table-export-email-header h3{margin:0;font-size:16px;font-weight:600;color:#2f2f2f;display:flex;align-items:center;gap:8px;}',
      '.table-export-email-close{width:32px;height:32px;border:none;background:transparent;color:#8d8b85;border-radius:8px;cursor:pointer;}',
      '.table-export-email-close:hover{background:#f3f1ea;color:#444;}',
      '.table-export-email-body{padding:14px 16px;max-height:min(70vh,620px);overflow:auto;}',
      '.table-export-email-group{margin-bottom:10px;}',
      '.table-export-email-group label{display:block;font-size:12px;font-weight:600;color:#6f6d67;margin-bottom:6px;}',
      '.table-export-email-radio-row{display:flex;gap:14px;flex-wrap:wrap;}',
      '.table-export-email-radio-label{font-size:13px;color:#444;display:flex;align-items:center;gap:6px;}',
      '.table-export-email-input,.table-export-email-select,.table-export-email-textarea{width:100%;box-sizing:border-box;border:1px solid #dbd7ce;border-radius:8px;padding:10px 11px;font-size:13px;outline:none;}',
      '.table-export-email-input:focus,.table-export-email-select:focus,.table-export-email-textarea:focus{border-color:#B8860B;box-shadow:0 0 0 2px rgba(184,134,11,.12);}',
      '.table-export-email-input[readonly]{background:#f8f7f4;color:#666;}',
      '.table-export-email-textarea{min-height:92px;resize:vertical;}',
      '.table-export-email-footer{padding:12px 16px;border-top:1px solid #f0ece2;display:flex;justify-content:flex-end;gap:8px;background:#fff;}',
      '.table-export-email-btn{padding:9px 14px;border-radius:8px;border:1px solid #dbd7ce;background:#fff;cursor:pointer;font-size:13px;font-weight:500;color:#555;}',
      '.table-export-email-btn.send{background:#B8860B;border-color:#B8860B;color:#fff;}'
    ].join('');
    document.head.appendChild(style);
  }

  function findTargetTable(btn) {
    var host = btn.closest('.table-export-host');
    if (host) {
      var tableInHost = host.querySelector('table');
      if (tableInHost) return tableInHost;
    }

    var wrappers = document.querySelectorAll('.table-wrapper table, table.responsive-table, table');
    for (var i = 0; i < wrappers.length; i += 1) {
      var table = wrappers[i];
      var cs = window.getComputedStyle(table);
      if (cs.display !== 'none' && table.offsetParent !== null) {
        return table;
      }
    }

    return document.querySelector('table');
  }

  function extractTableData(table) {
    if (!table) return { headers: [], rows: [] };

    var headerCells = table.querySelectorAll('thead th');
    var headers = [];

    if (headerCells.length) {
      for (var i = 0; i < headerCells.length; i += 1) {
        headers.push(headerCells[i].innerText.trim());
      }
    } else {
      var firstRow = table.querySelector('tr');
      if (firstRow) {
        var firstCells = firstRow.querySelectorAll('th,td');
        for (var j = 0; j < firstCells.length; j += 1) {
          headers.push(firstCells[j].innerText.trim());
        }
      }
    }

    var bodyRows = table.querySelectorAll('tbody tr');
    if (!bodyRows.length) {
      bodyRows = table.querySelectorAll('tr');
      if (bodyRows.length > 0 && headerCells.length) {
        bodyRows = Array.prototype.slice.call(bodyRows, 1);
      }
    }

    var rows = [];
    for (var r = 0; r < bodyRows.length; r += 1) {
      var tr = bodyRows[r];
      if (window.getComputedStyle(tr).display === 'none') continue;

      var cells = tr.querySelectorAll('th,td');
      var row = [];
      var hasValue = false;

      for (var c = 0; c < cells.length; c += 1) {
        var text = cells[c].innerText.replace(/\s+/g, ' ').trim();
        if (text) hasValue = true;
        row.push(text);
      }

      if (hasValue) rows.push(row);
    }

    return { headers: headers, rows: rows };
  }

  function getTitle() {
    var h3 = document.querySelector('.section-title') || document.querySelector('h3') || document.querySelector('h2');
    return h3 ? h3.innerText.replace(/\s+/g, ' ').trim() : 'Report';
  }

  function sanitizeFilename(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'report';
  }

  async function exportPdf(btn) {
    var table = findTargetTable(btn);
    var data = extractTableData(table);

    if (!data.headers.length || !data.rows.length) {
      alert('No hay datos para exportar en PDF.');
      return;
    }

    await loadScript(LIBS.jspdf);
    await loadScript(LIBS.autotable);

    var jsPDFRef = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDFRef) {
      alert('No se pudo cargar la libreria PDF.');
      return;
    }

    var doc = new jsPDFRef({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    var title = getTitle();

    doc.setFontSize(14);
    doc.text(title, 40, 34);

    doc.autoTable({
      head: [data.headers],
      body: data.rows,
      startY: 50,
      styles: { fontSize: 8, cellPadding: 4 },
      headStyles: { fillColor: [184, 134, 11], textColor: [255, 255, 255] },
      margin: { left: 40, right: 40 }
    });

    var filename = sanitizeFilename(title) + '_' + new Date().toISOString().slice(0, 10) + '.pdf';
    doc.save(filename);
  }

  async function exportExcel(btn) {
    var table = findTargetTable(btn);
    var data = extractTableData(table);

    if (!data.headers.length || !data.rows.length) {
      alert('No hay datos para exportar en Excel.');
      return;
    }

    await loadScript(LIBS.xlsx);
    if (!window.XLSX) {
      alert('No se pudo cargar la libreria Excel.');
      return;
    }

    var wb = window.XLSX.utils.book_new();
    var rows = [data.headers].concat(data.rows);
    var ws = window.XLSX.utils.aoa_to_sheet(rows);

    var range = window.XLSX.utils.decode_range(ws['!ref'] || 'A1:A1');
    for (var c = range.s.c; c <= range.e.c; c += 1) {
      var headerAddr = window.XLSX.utils.encode_cell({ r: 0, c: c });
      if (ws[headerAddr]) {
        ws[headerAddr].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'EDE6D1' } }
        };
      }
    }

    window.XLSX.utils.book_append_sheet(wb, ws, 'Reporte');

    var title = getTitle();
    var filename = sanitizeFilename(title) + '_' + new Date().toISOString().slice(0, 10) + '.xlsx';
    window.XLSX.writeFile(wb, filename, { compression: true });
  }

  function ensureEmailModal() {
    var existing = document.getElementById(modalId);
    if (existing) return existing;

    var overlay = document.createElement('div');
    overlay.id = modalId;
    overlay.className = 'table-export-email-overlay';
    overlay.innerHTML = [
  '<div class="table-export-email-box" role="dialog" aria-modal="true">',
  '<div class="table-export-email-header">',
  '<h3><i class="fas fa-paper-plane"></i> Resend Documentation</h3>',
  '<button type="button" class="table-export-email-close" aria-label="Close"><i class="fas fa-times"></i></button>',
  '</div>',
  '<div class="table-export-email-body">',
  '<div class="table-export-email-group">',
//   '<label>Resend to</label>',
//   '<div class="table-export-email-radio-row">',
//   '<label class="table-export-email-radio-label"><input type="radio" name="tableExportEmailSendTo" value="intermediario"> Intermediary</label>',
//   '<label class="table-export-email-radio-label"><input type="radio" name="tableExportEmailSendTo" value="cliente" checked> Client</label>',
//   '</div>',
  '</div>',
  '<div class="table-export-email-group">',
  '<label for="tableExportEmailDoc">Document to send</label>',
  '<input class="table-export-email-input" id="tableExportEmailDoc" type="text" readonly>',
  '</div>',
  '<div class="table-export-email-group">',
  '<label for="tableExportEmailName">Name</label>',
  '<input class="table-export-email-input" id="tableExportEmailName" type="text" placeholder="Recipient name">',
  '</div>',
  '<div class="table-export-email-group">',
  '<label for="tableExportEmailSelect">Select Email</label>',
  '<select class="table-export-email-select" id="tableExportEmailSelect"></select>',
  '</div>',
  '<div class="table-export-email-group">',
  '<label for="tableExportEmailOther">Enter Another Email (Optional)</label>',
  '<input class="table-export-email-input" id="tableExportEmailOther" type="email" placeholder="other@email.com">',
  '</div>',
  '<div class="table-export-email-group">',
  '<label for="tableExportEmailMessage">Message (Optional)</label>',
  '<textarea class="table-export-email-textarea" id="tableExportEmailMessage" placeholder="Additional message..."></textarea>',
  '</div>',
  '</div>',
  '<div class="table-export-email-footer">',
  '<button type="button" class="table-export-email-btn cancel">Cancel</button>',
  '<button type="button" class="table-export-email-btn send"><i class="fas fa-paper-plane"></i> Send</button>',
  '</div>',
  '</div>'
].join('');

    function closeModal() {
      overlay.classList.remove('open');
    }

    overlay.addEventListener('click', function (ev) {
      if (ev.target === overlay) {
        closeModal();
      }
    });

    overlay.querySelector('.table-export-email-close').addEventListener('click', closeModal);
    overlay.querySelector('.cancel').addEventListener('click', closeModal);

    overlay.querySelector('.send').addEventListener('click', function () {
      var selectEmail = overlay.querySelector('#tableExportEmailSelect').value;
      var otherEmail = overlay.querySelector('#tableExportEmailOther').value.trim();
      var toEmail = otherEmail || selectEmail;
      var name = overlay.querySelector('#tableExportEmailName').value.trim();
      var message = overlay.querySelector('#tableExportEmailMessage').value.trim();
      var docTitle = overlay.querySelector('#tableExportEmailDoc').value.trim() || getTitle();

      if (!toEmail) {
        var otherInput = overlay.querySelector('#tableExportEmailOther');
        otherInput.focus();
        otherInput.style.borderColor = '#e53935';
        setTimeout(function () { otherInput.style.borderColor = ''; }, 1500);
        return;
      }

      var bodyText = (name ? 'Estimado/a ' + name + ',\n\n' : '') +
        (message ? message + '\n\n' : '') +
        'Se adjunta el reporte: ' + docTitle + '\n\n' +
        'Generado el: ' + new Date().toLocaleString('es-ES') + '\n' +
        '- Motiv Perfumes Brand Portal';

      var mailto = 'mailto:' + encodeURIComponent(toEmail) +
        '?subject=' + encodeURIComponent('Reporte: ' + docTitle) +
        '&body=' + encodeURIComponent(bodyText);

      window.location.href = mailto;
      closeModal();
    });

    document.body.appendChild(overlay);
    return overlay;
  }

  function openEmail(btn) {
    var modal = ensureEmailModal();
    var title = getTitle();
    var emails = ['francis@motivperfumes.com', 'jalmontem@gmail.com'];
    var select = modal.querySelector('#tableExportEmailSelect');

    select.innerHTML = '<option value="">- Seleccionar correo -</option>';
    for (var i = 0; i < emails.length; i += 1) {
      select.innerHTML += '<option value="' + emails[i] + '">' + emails[i] + '</option>';
    }

    modal.querySelector('#tableExportEmailDoc').value = title;
    modal.querySelector('#tableExportEmailName').value = '';
    modal.querySelector('#tableExportEmailOther').value = '';
    modal.querySelector('#tableExportEmailMessage').value = '';
    modal.classList.add('open');
  }

  function createButtonsHost(table) {
    if (!table) return;

    var wrapper = table.closest('.table-wrapper') || table.parentElement;
    if (!wrapper) return;

    if (wrapper.previousElementSibling && wrapper.previousElementSibling.classList.contains('table-export-controls')) {
      return;
    }

    if (wrapper.parentElement && wrapper.parentElement.querySelector('.export-btn')) {
      return;
    }

    var host = document.createElement('div');
    host.className = 'table-export-controls table-export-host';

    var pdfBtn = document.createElement('button');
    pdfBtn.type = 'button';
    pdfBtn.className = 'table-export-btn';
    pdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> PDF';
    pdfBtn.addEventListener('click', function () { exportPdf(pdfBtn); });

    var xlsBtn = document.createElement('button');
    xlsBtn.type = 'button';
    xlsBtn.className = 'table-export-btn';
    xlsBtn.innerHTML = '<i class="fas fa-file-excel"></i> Excel';
    xlsBtn.addEventListener('click', function () { exportExcel(xlsBtn); });

    var emailBtn = document.createElement('button');
    emailBtn.type = 'button';
    emailBtn.className = 'table-export-btn';
    emailBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar';
    emailBtn.addEventListener('click', function () { openEmail(emailBtn); });

    host.appendChild(pdfBtn);
    host.appendChild(xlsBtn);
    host.appendChild(emailBtn);

    wrapper.parentElement.insertBefore(host, wrapper);
  }

  function init() {
    if (window.location.hash && window.location.hash.toLowerCase().indexOf('overview') !== -1) {
      return;
    }

    ensureStyles();

    var tables = document.querySelectorAll('table');
    for (var i = 0; i < tables.length; i += 1) {
      createButtonsHost(tables[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
