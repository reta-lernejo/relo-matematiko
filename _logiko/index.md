---
layout: home
title: Logiko
---

{% assign mat = site.logiko | sort: "title" %}
{% for t in mat %}
{% unless t.url contains "index" %}
  {% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
  {% endif %}  
{% endunless %}
{% endfor %}
