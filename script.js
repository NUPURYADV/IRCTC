(function(){

  /* ---------- Station directory ---------- */
  var STATIONS = [
    { code: 'NDLS', name: 'New Delhi' },
    { code: 'BCT',  name: 'Mumbai Central' },
    { code: 'HWH',  name: 'Howrah (Kolkata)' },
    { code: 'MAS',  name: 'Chennai Central' },
    { code: 'SBC',  name: 'KSR Bengaluru' },
    { code: 'ADI',  name: 'Ahmedabad Jn' }
  ];

  /* ---------- Route database ----------
     Keyed by the two station codes sorted alphabetically and joined with "-".
     Each train stores ITS OWN canonical direction (from -> to). When the user
     searches the reverse direction, we mirror the displayed times/codes rather
     than storing every route twice. */
  var ROUTES = {

    'BCT-NDLS': [
      { name:'Mumbai Rajdhani', number:'12951', runDays:'DAILY', from:'NDLS', to:'BCT', depTime:'16:35', arrTime:'08:10', duration:'15h 35m',
        classes:[ {code:'SL',fare:855,status:'waiting',count:24}, {code:'3A',fare:1720,status:'rac',count:6}, {code:'2A',fare:2450,status:'available',count:18} ] },
      { name:'August Kranti Rajdhani', number:'12953', runDays:'DAILY', from:'NDLS', to:'BCT', depTime:'17:15', arrTime:'09:10', duration:'15h 55m',
        classes:[ {code:'SL',fare:850,status:'available',count:61}, {code:'3A',fare:1710,status:'available',count:33}, {code:'2A',fare:2430,status:'rac',count:2} ] },
      { name:'Paramount Express', number:'12137', runDays:'M · W · F · SU', from:'NDLS', to:'BCT', depTime:'22:00', arrTime:'15:40', duration:'17h 40m',
        classes:[ {code:'SL',fare:425,status:'waiting',count:8}, {code:'3A',fare:1120,status:'waiting',count:41}, {code:'2A',fare:1640,status:'waiting',count:12} ] },
      { name:'Golden Temple Mail', number:'12903', runDays:'DAILY', from:'NDLS', to:'BCT', depTime:'06:25', arrTime:'03:40', duration:'21h 15m',
        classes:[ {code:'SL',fare:380,status:'available',count:104}, {code:'3A',fare:990,status:'rac',count:9}, {code:'2A',fare:1450,status:'available',count:22} ] },
      { name:'Duronto Express', number:'12262', runDays:'T · TH · SA', from:'NDLS', to:'BCT', depTime:'23:45', arrTime:'14:35', duration:'14h 50m',
        classes:[ {code:'3A',fare:1780,status:'available',count:47}, {code:'2A',fare:2510,status:'available',count:15}, {code:'1A',fare:4150,status:'rac',count:3} ] }
    ],

    'HWH-NDLS': [
      { name:'Howrah Rajdhani', number:'12301', runDays:'DAILY', from:'NDLS', to:'HWH', depTime:'16:50', arrTime:'10:05', duration:'17h 15m',
        classes:[ {code:'3A',fare:1650,status:'available',count:55}, {code:'2A',fare:2380,status:'available',count:20}, {code:'1A',fare:3950,status:'rac',count:4} ] },
      { name:'Poorva Express', number:'12303', runDays:'DAILY', from:'NDLS', to:'HWH', depTime:'22:05', arrTime:'05:45', duration:'31h 40m',
        classes:[ {code:'SL',fare:465,status:'available',count:89}, {code:'3A',fare:1210,status:'available',count:30}, {code:'2A',fare:1780,status:'rac',count:8} ] },
      { name:'Howrah Duronto', number:'12273', runDays:'M · W · F', from:'NDLS', to:'HWH', depTime:'16:55', arrTime:'10:15', duration:'17h 20m',
        classes:[ {code:'3A',fare:1690,status:'available',count:40}, {code:'2A',fare:2410,status:'available',count:12}, {code:'1A',fare:3980,status:'waiting',count:5} ] },
      { name:'NDLS-HWH SF Express', number:'22307', runDays:'DAILY', from:'NDLS', to:'HWH', depTime:'21:15', arrTime:'23:30', duration:'26h 15m',
        classes:[ {code:'SL',fare:445,status:'available',count:152}, {code:'3A',fare:1150,status:'available',count:38}, {code:'2A',fare:1690,status:'available',count:10} ] }
    ],

    'MAS-NDLS': [
      { name:'Tamil Nadu Express', number:'12621', runDays:'DAILY', from:'NDLS', to:'MAS', depTime:'22:30', arrTime:'07:15', duration:'32h 45m',
        classes:[ {code:'SL',fare:545,status:'available',count:70}, {code:'3A',fare:1420,status:'available',count:25}, {code:'2A',fare:2050,status:'rac',count:6} ] },
      { name:'GT Express', number:'12615', runDays:'DAILY', from:'NDLS', to:'MAS', depTime:'18:10', arrTime:'23:40', duration:'29h 30m',
        classes:[ {code:'SL',fare:505,status:'available',count:95}, {code:'3A',fare:1340,status:'available',count:18}, {code:'2A',fare:1950,status:'available',count:9} ] },
      { name:'Chennai Rajdhani', number:'12433', runDays:'T · TH · SU', from:'NDLS', to:'MAS', depTime:'20:00', arrTime:'06:35', duration:'34h 35m',
        classes:[ {code:'3A',fare:2150,status:'available',count:42}, {code:'2A',fare:3050,status:'available',count:14}, {code:'1A',fare:5150,status:'rac',count:2} ] }
    ],

    'NDLS-SBC': [
      { name:'Karnataka Express', number:'12627', runDays:'DAILY', from:'NDLS', to:'SBC', depTime:'21:10', arrTime:'09:30', duration:'36h 20m',
        classes:[ {code:'SL',fare:610,status:'available',count:88}, {code:'3A',fare:1580,status:'available',count:20}, {code:'2A',fare:2280,status:'rac',count:5} ] },
      { name:'Bengaluru Rajdhani', number:'22691', runDays:'M · TH · SA', from:'NDLS', to:'SBC', depTime:'20:00', arrTime:'06:15', duration:'34h 15m',
        classes:[ {code:'3A',fare:2050,status:'available',count:35}, {code:'2A',fare:2950,status:'available',count:12}, {code:'1A',fare:4950,status:'waiting',count:3} ] },
      { name:'Karnataka Sampark Kranti', number:'12649', runDays:'DAILY', from:'NDLS', to:'SBC', depTime:'23:15', arrTime:'02:10', duration:'26h 55m',
        classes:[ {code:'SL',fare:540,status:'available',count:110}, {code:'3A',fare:1390,status:'available',count:28}, {code:'2A',fare:1980,status:'available',count:8} ] }
    ],

    'ADI-NDLS': [
      { name:'Ahmedabad Rajdhani', number:'12958', runDays:'DAILY', from:'NDLS', to:'ADI', depTime:'19:50', arrTime:'07:55', duration:'12h 05m',
        classes:[ {code:'3A',fare:1520,status:'available',count:60}, {code:'2A',fare:2180,status:'available',count:25}, {code:'1A',fare:3650,status:'available',count:6} ] },
      { name:'Ashram Express', number:'12915', runDays:'DAILY', from:'NDLS', to:'ADI', depTime:'16:35', arrTime:'07:15', duration:'14h 40m',
        classes:[ {code:'SL',fare:380,status:'available',count:140}, {code:'3A',fare:990,status:'available',count:45}, {code:'2A',fare:1440,status:'rac',count:10} ] },
      { name:'Swarna Jayanti Express', number:'12933', runDays:'DAILY', from:'NDLS', to:'ADI', depTime:'20:20', arrTime:'11:45', duration:'15h 25m',
        classes:[ {code:'SL',fare:400,status:'available',count:120}, {code:'3A',fare:1030,status:'available',count:30}, {code:'2A',fare:1490,status:'available',count:8} ] }
    ],

    'BCT-HWH': [
      { name:'Mumbai Howrah Mail', number:'12809', runDays:'DAILY', from:'BCT', to:'HWH', depTime:'20:05', arrTime:'07:20', duration:'35h 15m',
        classes:[ {code:'SL',fare:605,status:'available',count:98}, {code:'3A',fare:1580,status:'available',count:22}, {code:'2A',fare:2280,status:'rac',count:7} ] },
      { name:'Gitanjali Express', number:'12859', runDays:'DAILY', from:'BCT', to:'HWH', depTime:'06:00', arrTime:'04:25', duration:'22h 25m',
        classes:[ {code:'SL',fare:560,status:'available',count:140}, {code:'3A',fare:1460,status:'available',count:35}, {code:'2A',fare:2110,status:'available',count:10} ] },
      { name:'Howrah Duronto', number:'12839', runDays:'M · W · F', from:'BCT', to:'HWH', depTime:'20:20', arrTime:'16:10', duration:'19h 50m',
        classes:[ {code:'3A',fare:1720,status:'available',count:48}, {code:'2A',fare:2420,status:'available',count:16}, {code:'1A',fare:4050,status:'rac',count:4} ] }
    ],

    'BCT-MAS': [
      { name:'Mumbai Chennai Mail', number:'11041', runDays:'DAILY', from:'BCT', to:'MAS', depTime:'23:45', arrTime:'06:30', duration:'30h 45m',
        classes:[ {code:'SL',fare:520,status:'available',count:85}, {code:'3A',fare:1350,status:'available',count:20}, {code:'2A',fare:1950,status:'rac',count:6} ] },
      { name:'Chennai Express', number:'22159', runDays:'DAILY', from:'BCT', to:'MAS', depTime:'06:10', arrTime:'12:20', duration:'30h 10m',
        classes:[ {code:'SL',fare:510,status:'available',count:92}, {code:'3A',fare:1330,status:'available',count:18}, {code:'2A',fare:1920,status:'available',count:9} ] }
    ],

    'HWH-MAS': [
      { name:'Coromandel Express', number:'12841', runDays:'DAILY', from:'HWH', to:'MAS', depTime:'14:50', arrTime:'05:20', duration:'14h 30m',
        classes:[ {code:'SL',fare:460,status:'available',count:150}, {code:'3A',fare:1190,status:'available',count:35}, {code:'2A',fare:1720,status:'available',count:12} ] },
      { name:'Howrah Chennai Mail', number:'12663', runDays:'DAILY', from:'HWH', to:'MAS', depTime:'20:30', arrTime:'06:15', duration:'33h 45m',
        classes:[ {code:'SL',fare:480,status:'available',count:105}, {code:'3A',fare:1240,status:'available',count:25}, {code:'2A',fare:1790,status:'rac',count:8} ] }
    ],

    'BCT-SBC': [
      { name:'Udyan Express', number:'11301', runDays:'DAILY', from:'BCT', to:'SBC', depTime:'08:05', arrTime:'11:40', duration:'27h 35m',
        classes:[ {code:'SL',fare:480,status:'available',count:78}, {code:'3A',fare:1250,status:'available',count:16}, {code:'2A',fare:1810,status:'rac',count:5} ] },
      { name:'Udyan SF Express', number:'22625', runDays:'T · F · SU', from:'BCT', to:'SBC', depTime:'20:15', arrTime:'23:50', duration:'27h 35m',
        classes:[ {code:'SL',fare:470,status:'available',count:90}, {code:'3A',fare:1220,status:'available',count:22}, {code:'2A',fare:1770,status:'available',count:7} ] }
    ]
  };

  var state = { train: null, number: null, cls: null, fare: 0, pax: 1 };

  var fromSelect = document.getElementById('fromSelect');
  var toSelect = document.getElementById('toSelect');
  var trainListEl = document.getElementById('trainList');
  var resultsTitleEl = document.getElementById('resultsTitle');
  var resultsCountEl = document.getElementById('resultsCount');

  var panel = document.getElementById('bookingPanel');
  var trainNameEl = document.getElementById('bkTrainName');
  var trainMetaEl = document.getElementById('bkTrainMeta');
  var classBadgeEl = document.getElementById('bkClassBadge');
  var totalEl = document.getElementById('bkTotal');
  var paxCountEl = document.getElementById('paxCount');
  var confirmationEl = document.getElementById('confirmation');

  /* ---------- Helpers ---------- */
  function formatRupees(n){
    return '₹' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function flapTimeHTML(t){
    return t.split('').map(function(ch){
      return ch === ':' ? '<span class="colon">:</span>' : '<span>' + ch + '</span>';
    }).join('');
  }

  function statusLabel(cls){
    if(cls.status === 'available') return 'AVAILABLE ' + cls.count;
    if(cls.status === 'rac') return 'RAC ' + cls.count;
    return 'WL ' + cls.count;
  }

  function trainCardHTML(train, userFrom, userTo){
    var reversed = train.from !== userFrom;
    var depCode = reversed ? train.to : train.from;
    var arrCode = reversed ? train.from : train.to;
    var depTime = reversed ? train.arrTime : train.depTime;
    var arrTime = reversed ? train.depTime : train.arrTime;

    var chips = train.classes.map(function(c){
      return '<button type="button" class="class-chip" data-train="' + train.name + '" data-number="' + train.number + '" data-class="' + c.code + '" data-fare="' + c.fare + '">' +
        '<span class="class-code">' + c.code + '</span>' +
        '<span class="status-badge ' + c.status + '">' + statusLabel(c) + '</span>' +
        '<span class="fare-amt">' + formatRupees(c.fare) + '</span>' +
      '</button>';
    }).join('');

    return '<article class="train-card">' +
      '<div class="train-head"><div><span class="train-name">' + train.name.toUpperCase() + '</span><span class="train-number">' + train.number + '</span></div><span class="run-days">' + train.runDays + '</span></div>' +
      '<div class="journey-row">' +
        '<div class="stop departure"><span class="station-code">' + depCode + '</span><div class="flap-time">' + flapTimeHTML(depTime) + '</div></div>' +
        '<div class="journey-mid"><span class="duration">' + train.duration + '</span><div class="journey-line"></div></div>' +
        '<div class="stop arrival"><span class="station-code">' + arrCode + '</span><div class="flap-time">' + flapTimeHTML(arrTime) + '</div></div>' +
      '</div>' +
      '<div class="avail-row">' + chips + '</div>' +
    '</article>';
  }

  function clearBooking(){
    state.train = null; state.number = null; state.cls = null; state.fare = 0; state.pax = 1;
    confirmationEl.classList.remove('show');
    confirmationEl.textContent = '';
    render();
  }

  function renderResults(fromCode, toCode){
    resultsTitleEl.textContent = fromCode + ' → ' + toCode;
    clearBooking();

    if(fromCode === toCode){
      trainListEl.innerHTML = '<div class="no-results">Please choose two different stations to search trains.</div>';
      resultsCountEl.textContent = '0 trains found';
      return;
    }

    var key = [fromCode, toCode].slice().sort().join('-');
    var trains = ROUTES[key];

    if(!trains || !trains.length){
      trainListEl.innerHTML = '<div class="no-results">No direct trains in this demo dataset for ' + fromCode + ' ↔️ ' + toCode + '.<br>Try New Delhi, Mumbai, Howrah, Chennai, Bengaluru, or Ahmedabad in either field.</div>';
      resultsCountEl.textContent = '0 trains found';
      return;
    }

    trainListEl.innerHTML = trains.map(function(t){ return trainCardHTML(t, fromCode, toCode); }).join('');
    resultsCountEl.textContent = trains.length + ' train' + (trains.length > 1 ? 's' : '') + ' found';
  }

  function render(){
    if(!state.cls){
      panel.classList.remove('has-selection');
      return;
    }
    panel.classList.add('has-selection');
    trainNameEl.textContent = state.train;
    trainMetaEl.textContent = 'Train ' + state.number + ' · ' + resultsTitleEl.textContent;
    classBadgeEl.textContent = state.cls;
    totalEl.textContent = formatRupees(state.fare * state.pax);
    paxCountEl.textContent = state.pax;
  }

  /* ---------- Populate station selects ---------- */
  STATIONS.forEach(function(s){
    var opt1 = document.createElement('option');
    opt1.value = s.code;
    opt1.textContent = s.name + ' — ' + s.code;
    fromSelect.appendChild(opt1);

    var opt2 = document.createElement('option');
    opt2.value = s.code;
    opt2.textContent = s.name + ' — ' + s.code;
    toSelect.appendChild(opt2);
  });
  fromSelect.value = 'NDLS';
  toSelect.value = 'BCT';

  /* ---------- Event listeners ---------- */
  document.getElementById('searchBtn').addEventListener('click', function(){
    renderResults(fromSelect.value, toSelect.value);
  });

  document.getElementById('swapBtn').addEventListener('click', function(){
    var tmp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tmp;
    renderResults(fromSelect.value, toSelect.value);
  });

  trainListEl.addEventListener('click', function(e){
    var chip = e.target.closest('.class-chip');
    if(!chip) return;

    document.querySelectorAll('.class-chip.selected').forEach(function(c){
      c.classList.remove('selected');
    });
    chip.classList.add('selected');

    state.train = chip.getAttribute('data-train');
    state.number = chip.getAttribute('data-number');
    state.cls = chip.getAttribute('data-class');
    state.fare = parseInt(chip.getAttribute('data-fare'), 10);
    state.pax = 1;

    confirmationEl.classList.remove('show');
    confirmationEl.textContent = '';
    render();
  });

  document.getElementById('paxMinus').addEventListener('click', function(){
    if(!state.cls || state.pax <= 1) return;
    state.pax -= 1;
    render();
  });

  document.getElementById('paxPlus').addEventListener('click', function(){
    if(!state.cls || state.pax >= 6) return;
    state.pax += 1;
    render();
  });

  document.getElementById('proceedBtn').addEventListener('click', function(){
    if(!state.cls){
      confirmationEl.classList.add('show');
      confirmationEl.innerHTML = 'Select a class before proceeding to book.';
      return;
    }
    var pnr = 'PNR ' + Math.floor(2000000000 + Math.random() * 799999999);
    confirmationEl.classList.add('show');
    confirmationEl.innerHTML =
      'Booking confirmed — <span class="pnr">' + pnr + '</span><br>' +
      state.train + ' (' + state.number + ') · Class ' + state.cls + ' · ' +
      state.pax + ' passenger' + (state.pax > 1 ? 's' : '') + '<br>' +
      resultsTitleEl.textContent + ' · 12 Jul 2026 · Total paid: ' + formatRupees(state.fare * state.pax);
  });

  /* ---------- Initial load ---------- */
  renderResults('NDLS', 'BCT');

})();