---
layout: home
title: Geometrio
---

{% assign mat = site.geometrio | sort: "title" %}
{% for t in mat %}
{% unless t.url contains "index" %}
  {% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
  {% endif %}  
{% endunless %}
{% endfor %}
