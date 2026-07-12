(function(){
  var state = { train: null, number: null, cls: null, fare: 0, pax: 1 };

  var panel = document.getElementById('bookingPanel');
  var trainNameEl = document.getElementById('bkTrainName');
  var trainMetaEl = document.getElementById('bkTrainMeta');
  var classBadgeEl = document.getElementById('bkClassBadge');
  var totalEl = document.getElementById('bkTotal');
  var paxCountEl = document.getElementById('paxCount');
  var confirmationEl = document.getElementById('confirmation');

  function formatRupees(n){
    return '₹' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function render(){
    if(!state.cls){
      panel.classList.remove('has-selection');
      return;
    }
    panel.classList.add('has-selection');
    trainNameEl.textContent = state.train;
    trainMetaEl.textContent = 'Train ' + state.number + ' · NDLS → BCT';
    classBadgeEl.textContent = state.cls;
    totalEl.textContent = formatRupees(state.fare * state.pax);
    paxCountEl.textContent = state.pax;
  }

  document.querySelectorAll('.class-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
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
      'NDLS → BCT · 12 Jul 2026 · Total paid: ' + formatRupees(state.fare * state.pax);
  });
})();