# CLAUDE.md — Cabrio Club Drenthe - Routeboeken

## Over dit project

Statische Jekyll-site voor de Cabrio Club Drenthe. Leden publiceren hier jaarlijkse cabriorondes: dagindelingen met tijden, locaties en adressen, plus GPX-bestanden om de route te volgen.

## Technische keuzes

| Keuze | Waarde |
|---|---|
| Jekyll versie | 4.3 |
| Deployment | GitHub Actions |
| Contentformaat | AsciiDoc met front matter (collectie `_ritten/`) |
| Taal | Nederlands (nl) |
| Thema / CSS | Minimale eigen SCSS — zie THEMES.md om een thema te kiezen |
| Tags | ja |
| Tagfilter stijl | B — gegroepeerde chips, deelbare URL's |
| Meertalig | nee |

## Contentstructuur

Elke rit heeft een eigen directory in `_ritten/`. Naamgeving: `JJJJ-MM-DD-<naam>/`. Daarin staan alleen de AsciiDoc-bestanden (`rit.adoc`, `locaties.adoc`, `routes.adoc`) en `_attrs.adoc`.

Statische bestanden (foto's, GPX, ITN, Kurviger) staan in `assets/ritten/JJJJ-MM-DD-<naam>/`. Jekyll kopieert deze ongewijzigd naar `_site/assets/ritten/...`. De splitsing is noodzakelijk omdat Jekyll bij een aangepaste permalink statische bestanden in `_ritten/` incorrect verwerkt (mapstructuur gaat verloren).

- Foto: `assets/ritten/JJJJ-MM-DD-<naam>/fotos/rit.jpeg`
- Routes: `assets/ritten/JJJJ-MM-DD-<naam>/routes/<bestand>.gpx`

### Verplichte front matter per rondrit

| Veld | Type | Beschrijving |
|---|---|---|
| `title` | string | Naam van de rondrit |
| `date` | date | Datum in formaat `JJJJ-MM-DD` |
| `afstand` | integer | Totale afstand in km |
| `tags` | lijst | Zie onderstaande tags |
| `main` | boolean | Altijd `true` — markeert dit als het hoofd-rit-bestand zodat het op de homepage verschijnt |
| `permalink` | string | Altijd `/ritten/JJJJ-MM-DD-rit-<naam>/` — voorkomt dat Jekyll de bestandsnaam (`rit`) als URL gebruikt |
| `routes` | lijst | Lijst van GPX-bestanden met `naam` en `gpx` (pad naar het bestand) |

### Voorbeeld rondrit

```adoc
---
layout: rondrit
title: "Voorbeeld Rondrit"
date: 2026-06-15
afstand: 120
tags:
  - drenthe
  - middel
  - dagrit
routes:
  - naam: "Deel 1: Start - Tussenstop"
    gpx: "routes/2026-06-15 Deel 1.gpx"
---
= Voorbeeld Rondrit

== Indeling

[cols="1,2,2,1,1", options="header"]
|===
| Tijd | Locatie / Route | Adres | Duur | Afstand
| 10:00 - 10:30 | Ontvangst bij *Locatienaam* | Straat 1, 1234 AB Stad | 30 min |
| 10:30 - 12:00 2+| Route deel 1 | 90 min | 60 km
|===
```

## Projectstructuur

```
_ritten/                        — AsciiDoc bronbestanden per rit
  JJJJ-MM-DD-<naam>/
    _attrs.adoc                 — gedeelde AsciiDoc-variabelen (titel, datum, afstand)
    rit.adoc                    — hoofdpagina (main: true)
    locaties.adoc               — locatieoverzicht
    routes.adoc                 — downloadtabel routes
assets/
  css/                          — main.scss (ingangspunt)
  js/                           — filter.js (interactieve tagfilter)
  ritten/                       — statische bestanden per rit
    JJJJ-MM-DD-<naam>/
      fotos/
        rit.jpeg                — ritfoto
      routes/                   — GPX, ITN, Kurviger bestanden
_layouts/                       — default.html, rondrit.html, tag.html
_includes/                      — nav.html, card.html, filter-bar.html
_sass/                          — main.scss (basisstijlen)
_data/
  tag_groups.yml                — taggroepen voor de filterbar
tags/                           — statische pagina per tag
.github/workflows/              — jekyll.yml (GitHub Actions deployment)
```

## Voor livegang

- [ ] **Stel `baseurl` in `_config.yml`** — nu `""`. Bij een project-page (`username.github.io/cabrio-club-drenthe`) wijzig naar `"/cabrio-club-drenthe"`. Bij een user/org-page of eigen domein: laat leeg.
- [ ] **Kies een thema** — zie THEMES.md. De huidige minimale CSS werkt, maar een thema geeft een professionelere uitstraling.
- [ ] **Activeer GitHub Pages** in de repository-instellingen onder *Pages → Source → GitHub Actions*.

## Plugins en afhankelijkheden

| Gem | Doel |
|---|---|
| `jekyll` 4.3 | Statische sitegenerator |
| `jekyll-asciidoc` | AsciiDoc-ondersteuning (niet beschikbaar op klassieke GitHub Pages) |
| `jekyll-feed` | RSS-feed |
| `jekyll-seo-tag` | SEO-metatags |

GitHub Actions is vereist vanwege `jekyll-asciidoc`.

## Tags

Afgesproken tags (Nederlands):

- **Regio:** `drenthe`, `groningen`, `friesland`
- **Afstand:** `kort` (< 80 km), `middel` (80-150 km), `lang` (> 150 km)
- **Duur:** `dagrit`, `halve-dag`

Taggroepen zijn gedefinieerd in `_data/tag_groups.yml`.
Tagfilter stijl B: gegroepeerde chips, OR binnen groep, AND tussen groepen.
Deelbare URL's: ja (geselecteerde tags worden opgeslagen in de URL).

## Beschikbare skills

- `/jekyll-tag-sync` — controleert of alle vertalingen van een item equivalente tags hebben
- `/jekyll-translate` — detecteert items die in één taal bestaan maar in andere ontbreken

## Conventies

- Rit-directories: `_ritten/JJJJ-MM-DD-<naam>/` (kleine letters, koppeltekens, zonder `-rit-`)
- Vaste bestandsnamen per rit: `rit.adoc`, `locaties.adoc`, `routes.adoc`, `_attrs.adoc`
- Statische bestanden in `assets/ritten/JJJJ-MM-DD-<naam>/fotos/` en `assets/ritten/JJJJ-MM-DD-<naam>/routes/`
- `rit.adoc` krijgt expliciete `permalink: /ritten/JJJJ-MM-DD-<naam>/` in front matter
- `locaties.adoc` krijgt expliciete `permalink: /ritten/JJJJ-MM-DD-<naam>/locaties/`
- `routes.adoc` krijgt expliciete `permalink: /ritten/JJJJ-MM-DD-<naam>/routes/`
- AsciiDoc-titels met `=` (niet `#`)
- Tabellen in AsciiDoc-formaat met `[cols=...]`
