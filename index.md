---
layout: home
title: Enhavo
---

## Matematiko

{% assign mat = site.matematiko | sort: "title" %}
{% for t in mat %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}


### [Geometrio](geometrio)

{% assign mat = site.geometrio | sort: "title" %}
{% for t in mat %}
{% unless t.url contains "index" %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endunless %}
{% endfor %}

### [Logiko](logiko)

{% assign mat = site.logiko | sort: "title" %}
{% for t in mat %}
{% unless t.url contains "index" %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endunless %}
{% endfor %}
