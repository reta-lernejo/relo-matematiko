---
layout: home
title: Matematiko
---

<!-- alternativa nomo elementoj & molekuloj -->

<style>
    table td {
        border: none !important;
    }
    table tr {
        background-color: inherit !important;
    }
</style>

{% assign mat = site.matematiko | sort: "chapter" %}
{% for t in kem %}{% if t.title and t.chapter %}
| **{{ t.chapter}}** | [{{ t.title | escape }}]({{ t.url | relative_url }}) |{% endif %}{% endfor %}

