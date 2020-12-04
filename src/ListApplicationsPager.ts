import { APIClient } from './APIClient'
import { Application } from './Application'
import { snake2camel } from './conversions'

export class ListApplicationsPager {
  private readonly client: APIClient

  constructor (client: APIClient) {
    this.client = client
  }

  public async * listApplications (maxRecords?: number): AsyncGenerator<Application, unknown, unknown> {
    let resetMaxRecords = false

    if (maxRecords === undefined || maxRecords === null || maxRecords <= 0) {
      maxRecords = Infinity
      resetMaxRecords = true
    }

    let n = 0
    const pageParams = {
      start: 0,
      count: maxRecords < 100 ? maxRecords : 100,
      cont: ''
    }

    while (pageParams.start < maxRecords) {
      const page = await this.client.listApplications(pageParams)

      if (n === 0) {
        if (resetMaxRecords || maxRecords > page.total) {
          maxRecords = page.total
        }
      }

      for (let i = 0; i < page.applications.length; i++) {
        if (n >= maxRecords) {
          return n
        }
        n++
        yield snake2camel(page.applications[i])
      }

      pageParams.cont = page.continuation
      pageParams.start += pageParams.count
    }

    return n
  }
}
