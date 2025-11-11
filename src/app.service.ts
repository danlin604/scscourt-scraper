import { Injectable } from '@nestjs/common';
import searchResultsFixture from './fixtures/response-john-smith.json';
import caseDetails10000 from './fixtures/response-john-smith-detail-case-10000.json';
import caseDetails10001 from './fixtures/response-john-smith-detail-case-10001.json';

const CASE_DETAILS_FIXTURES = {
  '10000': caseDetails10000,
  '10001': caseDetails10001,
};

const BASE_URL = 'https://portal.scscourt.org';

@Injectable()
export class AppService {
  async searchCases(
    firstName: string,
    lastName: string,
    domain: string = BASE_URL
  ): Promise<{ data: any[], sourceUrl: string }> {
    // Fetch cases
    const searchPartyUrl = `${domain}/api/cases/byparty`;
    const data = await this.fetchCases(searchPartyUrl, firstName, lastName);

    // Fetch case details
    const detailsPromises = data.map(caseItem =>
      this.fetchCaseDetails(domain, caseItem.caseId)
    );

    const detailsResults = await Promise.all(detailsPromises);

    // Map details back to cases
    data.forEach((caseItem, index) => {
      caseItem.details = detailsResults[index];
    });

    return {
      data,
      sourceUrl: `${domain}/search/party?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
    };
  }

  private async fetchCases(
    url: string,
    firstName: string,
    lastName: string
  ): Promise<any[]> {
    if (process.env.USE_FIXTURES !== 'false') {
      return searchResultsFixture.data;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'Referer': 'https://portal.scscourt.org/search',
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cases: ${response.status}`);
    }

    const json = await response.json();
    return json.data || [];
  }

  private async fetchCaseDetails(domain: string, caseId: string): Promise<any> {
    if (process.env.USE_FIXTURES !== 'false') {
      return CASE_DETAILS_FIXTURES[caseId];
    }

    try {
      const url = `${domain}/api/case/${caseId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Referer': `${domain}/case/${btoa(caseId)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      return json.data || {};
    } catch (error) {
      console.error(`Error fetching details for caseId ${caseId}:`, error.message);
      return {};
    }
  }
}