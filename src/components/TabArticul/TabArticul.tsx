import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { API_SEARCH_BY_ARTICUL_URL } from '@/fixtures/consts'
import SearchContent from '../DroppingWindow/DroppingWindow'
import CustomInput from '../ui/CustomInput/CustomInput'
import classNames from 'classnames'
import LoaderSvg from '../ui/LoaderSvg/LoaderSvg'
import { useTab } from '@/context/filterHooks'
import { getArticulHighlightParts } from '@/functions/highlightArticul'

const ARTICUL_INPUT_ID = 'filter-articul-input'

type Result = {
  ID: string
  CODE: string
  NAME: string
  DETAIL_PAGE_URL: string
  QUANTITY: string
}

const normalizeResults = (data: unknown): Result[] => {
  if (!Array.isArray(data)) return []
  return data
}

const MIN_QUERY_LENGTH = 3

export default function TabArticul() {
  const tab = useTab()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState<Result[] | null>(null)
  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    if (value.length < MIN_QUERY_LENGTH) return

    const timer = window.setTimeout(() => {
      const searchUrl = new URL(API_SEARCH_BY_ARTICUL_URL)
      searchUrl.searchParams.set('s', value)

      setNetworkError(false)
      setLoading(true)

      fetch(searchUrl, { method: 'GET' })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          setResults(normalizeResults(data))
          setLoading(false)
        })
        .catch((e) => {
          console.error('Fetch error.', e)
          setResults(null)
          setNetworkError(true)
          setLoading(false)
        })
    }, 400)

    return () => clearTimeout(timer)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value
    if (str.length < MIN_QUERY_LENGTH) {
      setResults(null)
      setLoading(false)
      setNetworkError(false)
    } else {
      setLoading(true)
    }
    setValue(str)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (results?.length) {
      location.href = results[0].DETAIL_PAGE_URL
    }
  }

  return (
    <>
      <div className={styles.root}>
        <form
          role="search"
          className={styles.search}
          onSubmit={handleSubmit}
        >
          <label htmlFor={ARTICUL_INPUT_ID} className={styles.visuallyHidden}>
            Артикул или номер детали
          </label>
          <CustomInput
            id={ARTICUL_INPUT_ID}
            className={styles.input}
            placeholder="AA000983, 8R0 827 272 A, A2108858301"
            autoFocus={tab === 1}
            value={value}
            max={40}
            svg={loading ? <LoaderSvg /> : <></>}
            onChange={handleChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (results?.length && e.key === 'Enter') {
                location.href = results[0].DETAIL_PAGE_URL
              }
            }}
          />
        </form>
        <p className={styles.mobileHint}>
          Номер, OEM, артикул можно указывать с пробелами и дефисами, например:
          8R0 827 272 A, AA000983, 52119-400
        </p>
      </div>
      {value && (
        <SearchContent>
          {value.length < MIN_QUERY_LENGTH && (
            <div className={styles.center}>Введите минимум 3 символа</div>
          )}
          {value.length >= MIN_QUERY_LENGTH && loading && (
            <div className={styles.center}>
              <LoaderSvg size={36} />
            </div>
          )}
          {value.length >= MIN_QUERY_LENGTH && networkError && !loading && (
            <div className={styles.error}>
              Не удалось выполнить поиск. Проверьте подключение к интернету.
            </div>
          )}
          {value.length >= MIN_QUERY_LENGTH &&
            !loading &&
            !networkError &&
            results?.length === 0 && (
              <div className={styles.empty}>
                По вашему запросу ничего не найдено.
              </div>
            )}
          {value.length >= MIN_QUERY_LENGTH &&
            !loading &&
            !networkError &&
            Boolean(results?.length) &&
            results?.map((result: Result) => {
              const { ID, NAME, DETAIL_PAGE_URL, QUANTITY } = result
              const highlight = getArticulHighlightParts(NAME, value)

              return (
                <a
                  key={ID}
                  className={classNames(
                    styles.link,
                    !parseInt(QUANTITY) && styles.red
                  )}
                  href={DETAIL_PAGE_URL}
                >
                  {highlight ? (
                    <>
                      {highlight.before}
                      <strong>{highlight.match}</strong>
                      {highlight.after}
                    </>
                  ) : (
                    NAME
                  )}{' '}
                  <strong>({QUANTITY}шт.)</strong>
                </a>
              )
            })}
        </SearchContent>
      )}
    </>
  )
}
