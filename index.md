---
layout: default
title: Cabrio Club Drenthe - Routeboeken
use_filter: true
---

{% include filter-bar.html %}

{% assign vandaag = site.time | date: "%Y-%m-%d" %}
{% assign alle_ritten = site.ritten | where: "main", true | sort: "date" %}

{% assign komende = "" | split: "" %}
{% assign gereden = "" | split: "" %}
{% for rit in alle_ritten %}
  {% assign rit_datum = rit.date | date: "%Y-%m-%d" %}
  {% if rit_datum >= vandaag %}
    {% assign komende = komende | push: rit %}
  {% else %}
    {% assign gereden = gereden | push: rit %}
  {% endif %}
{% endfor %}

<div class="item-grid">
  {% for item in komende %}
    {% include card.html item=item %}
  {% endfor %}
</div>

{% if gereden.size > 0 %}
<div class="gereden-header">
  <h2>Gereden ritten</h2>
</div>
<div class="item-grid">
  {% assign gereden_desc = gereden | reverse %}
  {% for item in gereden_desc %}
    {% include card.html item=item %}
  {% endfor %}
</div>
{% endif %}
