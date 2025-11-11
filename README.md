Include a section in your README titled “Access & Anti-Bot Strategy (Legal and Operational)”, describing:

How you verified whether scraping is permitted (robots.txt, terms of use, or by contacting the site owner).
Your compliant approach to access limits and geo-restrictions.
How mock-mode (offline fixtures) and live-mode are managed.
Your safeguards for proxy or networking design (without any bypass methods).
A clear statement confirming that no security protections were circumvented.


## Setup and deployment instructions (Docker)

### ENV Config

- **USE_FIXTURES** - Set to `true` (default) to use local fixture data instead of live API calls. Set to `false` only with proper authorization from Santa Clara County Superior Court.
- **THROTTLE_TTL** - Time-to-live in milliseconds for rate limiting window (default: 60000 = 1 minute)
- **THROTTLE_LIMIT** - Maximum number of requests allowed within the TTL window (default: 1)
- **PORT** - Server port number (default: 3000)

Example `.env` file:
```env
USE_FIXTURES=true
THROTTLE_TTL=60000
THROTTLE_LIMIT=1
PORT=3000
```

## Access & Anti-Bot Strategy (Legal and Operational)

### Scraping

Scraping is not permitted given that there are no robot.txt and there are anti-scraping measured built into the domain. Contacting the site owner and getting permission is required.

Relevant Links:
[California Rules of Court: Rule 2.503. Public Access] (https://courts.ca.gov/cms/rules/index/two/rule2_503)
[TOS](https://courts.ca.gov/about/terms-use)

### Limits

Network request is prevented and default rate limit is set at 1 request per minute out of caution until rate limit is agreed upon by the site owner.

### Mocks

Fixtures are extracted manually by solving captchas and headers examined to replicate real datasets.

### Safeguards

Basic design is to rate limit. Details are allowed to fail and primary dataset is returned. If deployed, this server should be internal use only and shouldn't be accessed by the public. The resulting dataset may be stored and cached separately as long as permission is granted and separately served to public.

### Compliance

No security protection where circumvented.

## Example cURL request and JSON response

Example cURL request:
```
curl -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d "{\"firstName\":\"John\",\"lastName\":\"Smith\"}"
```

Example JSON response
```JSON
{
  "data": [
    {
      "caseId": "10000",
      "nodeId": "11110",
      "caseNumber": "2001-1-CV-794971",
      "caseStyle": "RAYTHEON COMPANY     -VS-WEBGEAR INC.",
      "filingDate": "1/3/2001",
      "caseStatus": "Closed/Inactive",
      "caseType": "Breach of Contract/Warranty Unlimited  (06)",
      "caseSecurityGroup": null,
      "caseLocation": null,
      "details": {
        "data": {
          "caseParties": [
            {
              "attorneys": [],
              "casePartyId": "17174697",
              "type": "Plaintiff",
              "firstName": null,
              "middleName": null,
              "lastName": "RAYTHEON COMPANY",
              "nickName": null,
              "businessName": "RAYTHEON COMPANY",
              "fullName": "RAYTHEON COMPANY",
              "isDefendant": false
            },
            {
              "attorneys": [],
              "casePartyId": "17174698",
              "type": "Defendant",
              "firstName": null,
              "middleName": null,
              "lastName": "WEBGEAR INC.",
              "nickName": null,
              "businessName": "WEBGEAR INC.",
              "fullName": "WEBGEAR INC.",
              "isDefendant": true
            }
          ],
          "caseAttornies": [],
          "caseEvents": [],
          "caseHearings": [],
          "caseOtherDocuments": [],
          "caseCharges": [],
          "caseFinancials": [],
          "caseFinancialTransactions": [],
          "caseArrestInfomation": [],
          "casePartyDemographics": {
            "race": null,
            "sex": null,
            "dateOfBirth": null,
            "height": null,
            "weight": null,
            "hairColor": null,
            "eyeColor": null
          },
          "casePartyAddress": {
            "streetName": null,
            "city": null,
            "state": null,
            "zip": null
          },
          "casePartyIdentification": [],
          "caseDocuments": [],
          "minuteOrders": [],
          "caseFlags": [],
          "partyInJailFlags": [],
          "caseBonds": [],
          "caseWarrants": [],
          "caseCrossReferenceNumbers": [],
          "relatedCases": [],
          "id": "10000",
          "caseNumber": "2001-1-CV-794971",
          "style": "RAYTHEON COMPANY\nvs.\nWEBGEAR INC.",
          "caseCategory": 0,
          "type": "Breach of Contract/Warranty Unlimited  (06)",
          "typeId": "CV",
          "fileDate": "1/3/2001",
          "securityGroup": null,
          "status": "Closed/Inactive",
          "courtLocation": "Santa Clara",
          "caseSubType": null,
          "nodeId": 11110,
          "permission": 0,
          "isSecuredAccess": false,
          "isCriminal": false
        },
        "result": 0,
        "created": "2025-11-10T23:18:34.4883496Z",
        "message": "Case number 10000 was found"
      }
    },
    {
      "caseId": "10001",
      "nodeId": "11110",
      "caseNumber": "2001-1-CV-800357",
      "caseStyle": "VILLARREAL           -VS-SUNSET OAKS",
      "filingDate": "8/1/2001",
      "caseStatus": "Closed/Inactive",
      "caseType": "Auto Unlimited (22)",
      "caseSecurityGroup": null,
      "caseLocation": null,
      "details": {
        "data": {
          "caseParties": [
            {
              "attorneys": [],
              "casePartyId": "17174699",
              "type": "Plaintiff",
              "firstName": null,
              "middleName": null,
              "lastName": "VILLARREAL",
              "nickName": null,
              "businessName": null,
              "fullName": "VILLARREAL",
              "isDefendant": false
            },
            {
              "attorneys": [],
              "casePartyId": "17174700",
              "type": "Defendant",
              "firstName": null,
              "middleName": null,
              "lastName": "SUNSET OAKS",
              "nickName": null,
              "businessName": "SUNSET OAKS",
              "fullName": "SUNSET OAKS",
              "isDefendant": true
            }
          ],
          "caseAttornies": [],
          "caseEvents": [],
          "caseHearings": [],
          "caseOtherDocuments": [],
          "caseCharges": [],
          "caseFinancials": [],
          "caseFinancialTransactions": [],
          "caseArrestInfomation": [],
          "casePartyDemographics": {
            "race": null,
            "sex": null,
            "dateOfBirth": null,
            "height": null,
            "weight": null,
            "hairColor": null,
            "eyeColor": null
          },
          "casePartyAddress": {
            "streetName": null,
            "city": null,
            "state": null,
            "zip": null
          },
          "casePartyIdentification": [],
          "caseDocuments": [],
          "minuteOrders": [],
          "caseFlags": [],
          "partyInJailFlags": [],
          "caseBonds": [],
          "caseWarrants": [],
          "caseCrossReferenceNumbers": [],
          "relatedCases": [],
          "id": "10001",
          "caseNumber": "2001-1-CV-800357",
          "style": "VILLARREAL\nvs.\nSUNSET OAKS",
          "caseCategory": 0,
          "type": "Auto Unlimited (22)",
          "typeId": "CV",
          "fileDate": "8/1/2001",
          "securityGroup": null,
          "status": "Closed/Inactive",
          "courtLocation": "Santa Clara",
          "caseSubType": null,
          "nodeId": 11110,
          "permission": 0,
          "isSecuredAccess": false,
          "isCriminal": false
        },
        "result": 0,
        "created": "2025-11-10T23:18:34.4883496Z",
        "message": "Case number 10001 was found"
      }
    }
  ],
  "metadata": {
    "sourceUrl": "https://portal.scscourt.org/search/party?firstName=John&lastName=Smith",
    "timestamp": "2025-11-11T00:14:08.480Z"
  }
}
```