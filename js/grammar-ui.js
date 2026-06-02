function getTopicById(id) {
  return grammarTopics.find(t => t.id === id)
}

function getSectionById(sectionId) {
  for (const topic of grammarTopics) {
    const section = topic.sections.find(s => s.id === sectionId)
    if (section) return { topic, section }
  }
  return undefined
}

function getAllExamples() {
  const result = []
  for (const topic of grammarTopics) {
    for (const section of topic.sections) {
      for (const ex of section.examples) {
        result.push({
          ro: ex.ro, ru: ex.ru, note: ex.note,
          topicId: topic.id, topicTitle: topic.title,
          sectionId: section.id, sectionTitle: section.title,
        })
      }
    }
  }
  return result
}

function getExamplesByTopic(topicId) {
  const topic = getTopicById(topicId)
  if (!topic) return []
  return topic.sections.flatMap(s =>
    s.examples.map(ex => ({
      ro: ex.ro, ru: ex.ru, note: ex.note,
      topicId: topic.id, topicTitle: topic.title,
      sectionId: s.id, sectionTitle: s.title,
    }))
  )
}

function search(query) {
  const q = query.toLowerCase()
  const results = []
  for (const topic of grammarTopics) {
    for (const section of topic.sections) {
      for (const ex of section.examples) {
        if (ex.ro.toLowerCase().includes(q) || ex.ru.toLowerCase().includes(q)) {
          results.push({ topic, section, example: ex })
        }
      }
      if (section.body.toLowerCase().includes(q) || section.title.toLowerCase().includes(q)) {
        if (!results.find(r => r.section.id === section.id)) {
          results.push({ topic, section, example: null })
        }
      }
    }
  }
  return results
}

function renderTable(table) {
  if (!table) return ''
  const headers = table.headers.map(h => `<th>${esc(h)}</th>`).join('')
  const rows = table.rows.map(row =>
    `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`
  ).join('')
  return `<div class="gr-table-wrap"><table class="gr-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`
}

function renderExamples(examples) {
  return `<div class="gr-examples">${examples.map(ex => `
    <div class="gr-example">
      <div class="gr-example-text">
        <div class="gr-example-ro">${esc(ex.ro)}</div>
        <div class="gr-example-ru">${esc(ex.ru)}</div>
        ${ex.note ? `<div class="gr-example-note">${esc(ex.note)}</div>` : ''}
      </div>
    </div>`).join('')}</div>`
}

function renderTopics(topics) {
  return topics.map(topic => `
    <div class="gr-topic-card" data-topic-id="${topic.id}">
      <div class="gr-topic-head">
        <div class="gr-topic-icon">${topic.icon}</div>
        <div class="gr-topic-info">
          <div class="gr-topic-title">${esc(topic.title)}</div>
          <div class="gr-topic-desc">${esc(topic.description)}</div>
        </div>
        <svg class="gr-topic-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="gr-sections">
        ${topic.sections.map(section => `
          <div class="gr-section">
            <div class="gr-section-title">${esc(section.title)}</div>
            <div class="gr-section-body">${esc(section.body)}</div>
            ${renderTable(section.table)}
            ${renderExamples(section.examples)}
          </div>`).join('')}
      </div>
    </div>`).join('')
}

function renderSearchResults(query) {
  const results = search(query)
  if (results.length === 0) {
    return `<div class="gr-no-results">Ничего не найдено по «${esc(query)}»</div>`
  }
  return results.map(({ topic, section, example }) => {
    if (example) {
      return `
        <div class="gr-result-item">
          <div class="gr-result-topic">${esc(topic.icon)} ${esc(topic.title)}</div>
          <div class="gr-result-section">${esc(section.title)}</div>
          <div>
            <div class="gr-result-ro">${esc(example.ro)}</div>
            <div class="gr-result-ru">${esc(example.ru)}</div>
            ${example.note ? `<div class="gr-result-note">${esc(example.note)}</div>` : ''}
          </div>
        </div>`
    } else {
      return `
        <div class="gr-result-item">
          <div class="gr-result-topic">${esc(topic.icon)} ${esc(topic.title)}</div>
          <div class="gr-result-ro" style="font-size:13px;font-weight:600">${esc(section.title)}</div>
          <div class="gr-result-ru">${esc(section.body.slice(0, 120))}…</div>
        </div>`
    }
  }).join('')
}

function renderGrammar(container, options = {}) {
  const el = typeof container === 'string'
    ? document.querySelector(container)
    : container
  if (!el) { console.error('Grammar: контейнер не найден:', container); return }

  const { topics: topicFilter } = options
  const visibleTopics = topicFilter
    ? grammarTopics.filter(t => topicFilter.includes(t.id))
    : grammarTopics

  el.innerHTML = `
    <div class="gr-wrap">
      <div class="search-row">
        <i class="ph ph-magnifying-glass"></i>
        <input class="gr-search" type="search" placeholder="Поиск по грамматике..." autocomplete="off" />
      </div>
      <div class="gr-topics">${renderTopics(visibleTopics)}</div>
      <div class="gr-search-results"></div>
    </div>`

  const topicsEl = el.querySelector('.gr-topics')
  const searchResultsEl = el.querySelector('.gr-search-results')
  const searchInput = el.querySelector('.gr-search')

  function toggle(e) {
    const card = e.target.closest('.gr-topic-card')
    if (!card) return
    const isOpen = card.classList.contains('open')
    topicsEl.querySelectorAll('.gr-topic-card.open').forEach(c => c.classList.remove('open'))
    if (!isOpen) card.classList.add('open')
    card.querySelector('.gr-topic-head').scrollIntoView({ block: 'start' })
  }
  topicsEl.addEventListener('click', toggle)

  let searchTimer = null
  function input() {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      const q = searchInput.value.trim()
      if (q.length < 2) {
        topicsEl.classList.remove('hidden')
        searchResultsEl.classList.remove('active')
        searchResultsEl.innerHTML = ''
      } else {
        topicsEl.classList.add('hidden')
        searchResultsEl.classList.add('active')
        searchResultsEl.innerHTML = renderSearchResults(q)
      }
    }, 200)
  }
  searchInput.addEventListener('input', input)

  function onSearchClear() {
    if (!searchInput.value) {
      topicsEl.classList.remove('hidden')
      searchResultsEl.classList.remove('active')
      searchResultsEl.innerHTML = ''
    }
  }
  searchInput.addEventListener('search', onSearchClear)

  return function cleanup() {
    topicsEl.removeEventListener('click', toggle)
    searchInput.removeEventListener('input', input)
    searchInput.removeEventListener('search', onSearchClear)
    clearTimeout(searchTimer)
  }
}

Object.assign(window, { renderGrammar });
