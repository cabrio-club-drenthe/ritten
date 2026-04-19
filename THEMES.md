# Jekyll Thema's — Vinden, Installeren en Wijzigen

## Waar vind je thema's

- **[jekyllthemes.org](http://jekyllthemes.org)** — grote community-galerij, gratis thema's
- **[jekyllthemes.io](https://jekyllthemes.io)** — gecureerde galerij, mix van gratis en betaald
- **[GitHub topic: jekyll-theme](https://github.com/topics/jekyll-theme)** — open-source thema's op GitHub, gesorteerd op sterren
- **[jamstackthemes.dev](https://jamstackthemes.dev/ssg/jekyll/)** — moderne JAMstack-galerij met live previews

## Populaire thema's

| Thema | Stijl | Geschikt voor | GitHub Actions nodig? |
|---|---|---|---|
| [Minima](https://github.com/jekyll/minima) | Schoon, minimaal | Blogs, simpele sites | Nee |
| [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) | Feature-rijk, flexibel | Portfolio, docs, blog | Nee (remote theme) |
| [Chirpy](https://github.com/cotes2046/jekyll-theme-chirpy) | Modern, dark mode | Tech blogs | **Ja** |
| [Just the Docs](https://github.com/just-the-docs/just-the-docs) | Documentatie | Referentiesites | Nee |
| [Bulma Clean Theme](https://github.com/chrisrhymes/bulma-clean-theme) | Modern, Bulma-based | Algemeen gebruik | Nee |

> **Let op:** Dit project gebruikt al GitHub Actions (vanwege AsciiDoc), dus alle thema's zijn beschikbaar.

## Hoe installeer je een thema

### Optie 1 — Gem-based thema (aanbevolen)

1. Voeg de gem toe aan `Gemfile`:
   ```ruby
   gem "minimal-mistakes-jekyll"
   ```
2. Voer `bundle install` uit
3. Stel het thema in `_config.yml`:
   ```yaml
   theme: minimal-mistakes-jekyll
   ```
4. Volg de README van het thema voor vereiste front matter en layout-namen.

### Optie 2 — Remote theme

```yaml
# Gemfile
gem "jekyll-remote-theme"

# _config.yml
remote_theme: mmistakes/minimal-mistakes
plugins:
  - jekyll-remote-theme
```

### Optie 3 — Themabestanden kopiëren

Fork of download het thema en kopieer `_layouts/`, `_includes/` en `_sass/` naar dit project. Volledige controle, maar je beheert de updates zelf.

## Hoe wissel je van thema

1. Verwijder de oude thema-gem uit `Gemfile` en `_config.yml`.
2. Voeg de nieuwe thema-gem toe en voer `bundle install` uit.
3. Controleer welke layout-namen het nieuwe thema gebruikt — ze kunnen afwijken (bijv. `layout: post` vs `layout: single`). Pas de front matter in `_ritten/` aan.
4. Controleer of aanpassingen in `_layouts/` of `_includes/` nog kloppen.
5. Voer `bundle exec jekyll serve` lokaal uit om te controleren.

## Tips

- Controleer altijd de **minimale Jekyll-versie** van een thema.
- Clone de demo-repository van een thema en draai hem lokaal voordat je beslist.
- De huidige minimalistische CSS in `_sass/main.scss` kun je behouden naast een thema als uitgangspunt voor aanpassingen.
