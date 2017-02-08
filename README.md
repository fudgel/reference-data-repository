# reference-data-repository
Boiler Plate for Reference Data Management

A simple application that supports APIs for retrieving reference data categories and codes.
<h3>Dependences:</h3>
<br>&emsp;&emsp;1. NodeJS 4 or higher
<br>&emsp;&emsp;2. MongoDB 3.2 or higher <i>(uses a DB name of 'refDataRepo')</i>
<p>
<h3>Data Model:</h3>
<i><b>Category</b></i>
<br>&emsp;&emsp;id: String,
<br>&emsp;&emsp;category: String,
<br>&emsp;&emsp;version: String,
<br>&emsp;&emsp;description: String,
<br>&emsp;&emsp;parentCategory: String
   
<i><b>Codes</b> (category codes)</i>
<br>&emsp;&emsp;id: String,
<br>&emsp;&emsp;category: String,
<br>&emsp;&emsp;version: String,
<br>&emsp;&emsp;parentCode: String,
<br>&emsp;&emsp;canonicalCode: String,
<br>&emsp;&emsp;description: String,
<br>&emsp;&emsp;system1Code: String,
<br>&emsp;&emsp;system2Code: String
    
<h3>Use Cases:</h3>

1. Get list of all categories and category versions:    <a href="http://localhost:3000/api/categories/">http://localhost:3000/api/categories/</a>
2. Get detailed document of a reference data category:  <a href="http://localhost:3000/api/categories/CountryCode/v1">http://localhost:3000/api/categories/CountryCode/v1</a>
3. Get all codes for a given category and version:      <a href="http://localhost:3000/api/categories/CountryCode/v1/codes">http://localhost:3000/api/categories/CountryCode/v1/codes</a>
4. Get all codes that are filtered by parentCode:       <a href="http://localhost:3000/api/categories/State/v1/codes?parentCode=AU">http://localhost:3000/api/categories/State/v1/codes?parentCode=AU</a>
5. Get detail of code document for a canonical code:    <a href="http://localhost:3000/api/categories/CountryCode/v1/codes/CA">http://localhost:3000/api/categories/CountryCode/v1/codes/CA</a>
6. Get system code for given canonical code:            <a href="http://localhost:3000/api/categories/CountryCode/v1/codes/CA?fields=system1Code>http://localhost:3000/api/categories/CountryCode/v1/codes/CA?fields=system1Code</a>
7. Get canonical code for a given system code:          <a href="http://localhost:3000/api/categories/CountryCode/v1/codes/CAN?sourceCodeTypeQualifer=system1Code&amp;fields=canonicalCode">http://localhost:3000/api/categories/CountryCode/v1/codes/CAN?sourceCodeTypeQualifer=system1Code&amp;fields=canonicalCode</a>

READ ME is still a work in progress
