(function () {
  'use strict';

  const items   = document.querySelectorAll('[data-tags]');
  const groups  = document.querySelectorAll('.filter-group');
  const status  = document.getElementById('filter-status');

  // selected: per group, a Set of active tags (OR within group, AND between groups)
  const selected = {};
  groups.forEach(function (group) {
    const label = group.querySelector('.filter-group-label');
    if (label) selected[label.textContent.trim()] = new Set();
  });

  function tagsOf(el) {
    return el.dataset.tags ? el.dataset.tags.split(' ').filter(Boolean) : [];
  }

  function matches(itemTags) {
    // For each group that has selections, the item must have at least one tag from that group
    return Object.values(selected).every(function (groupTags) {
      if (groupTags.size === 0) return true;
      return [...groupTags].some(function (t) { return itemTags.includes(t); });
    });
  }

  function applyFilter() {
    var visible = 0;
    items.forEach(function (el) {
      var show = matches(tagsOf(el));
      el.hidden = !show;
      if (show) visible++;
    });

    updateCounts();
    syncToUrl();

    if (status) {
      var total = items.length;
      if (visible === total) {
        status.textContent = '';
      } else {
        status.textContent = visible + ' van ' + total + ' rondrits zichtbaar';
      }
    }
  }

  function updateCounts() {
    document.querySelectorAll('[data-filter-tag]').forEach(function (btn) {
      var tag   = btn.dataset.filterTag;
      var count = [...items].filter(function (el) {
        return !el.hidden && tagsOf(el).includes(tag);
      }).length;
      var badge = btn.querySelector('.tag-count');
      if (badge) badge.textContent = count > 0 ? count : '';
    });
  }

  function syncToUrl() {
    var params = new URLSearchParams();
    var hasAny = false;
    Object.entries(selected).forEach(function (entry) {
      var groupLabel = entry[0];
      var tagSet     = entry[1];
      if (tagSet.size > 0) {
        params.set(groupLabel, [...tagSet].join(','));
        hasAny = true;
      }
    });
    if (history.replaceState) {
      history.replaceState(null, '', hasAny ? '?' + params.toString() : location.pathname);
    }
  }

  function restoreFromUrl() {
    var params = new URLSearchParams(location.search);
    groups.forEach(function (group) {
      var label = group.querySelector('.filter-group-label');
      if (!label) return;
      var groupName = label.textContent.trim();
      var val = params.get(groupName);
      if (val) {
        val.split(',').filter(Boolean).forEach(function (t) {
          if (selected[groupName]) selected[groupName].add(t);
        });
      }
    });
  }

  function groupOf(btn) {
    var group = btn.closest('.filter-group');
    if (!group) return null;
    var label = group.querySelector('.filter-group-label');
    return label ? label.textContent.trim() : null;
  }

  // Wire up tag buttons
  document.querySelectorAll('[data-filter-tag]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag   = btn.dataset.filterTag;
      var group = groupOf(btn);
      if (!group || !selected[group]) return;

      if (selected[group].has(tag)) {
        selected[group].delete(tag);
        btn.classList.remove('is-active');
      } else {
        selected[group].add(tag);
        btn.classList.add('is-active');
      }

      applyFilter();
    });
  });

  // Clear button
  var clearBtn = document.getElementById('filter-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      Object.values(selected).forEach(function (s) { s.clear(); });
      document.querySelectorAll('[data-filter-tag]').forEach(function (b) {
        b.classList.remove('is-active');
      });
      applyFilter();
    });
  }

  // Restore from URL and apply on load
  restoreFromUrl();

  // Mark restored buttons as active
  Object.entries(selected).forEach(function (entry) {
    var groupLabel = entry[0];
    var tagSet     = entry[1];
    tagSet.forEach(function (tag) {
      document.querySelectorAll('[data-filter-tag="' + tag + '"]').forEach(function (btn) {
        if (groupOf(btn) === groupLabel) btn.classList.add('is-active');
      });
    });
  });

  applyFilter();
})();
