<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>

<h1>Segment & Sub-segment Matching System</h1>

<section>
  <h2>Overview</h2>
  <p>This system processes comma-separated user input strings and matches them against predefined segment and sub-segment datasets. It supports advanced rules to differentiate when to match segments versus sub-segments, including handling of parentheses in inputs, renamed entries, and remappings.</p>
</section>

<section>
  <h2>Features</h2>
  <ul>
    <li>Segments matched if input has no parentheses or parentheses contain <code>all segment</code> or <code>all segments</code>.</li>
    <li>Sub-segments matched if input has parentheses with other content, using inner parentheses text as key.</li>
    <li>Supports <code>Mapped</code>, <code>Renamed</code>, and <code>Remap</code> tags for entries for resolving names.</li>
    <li>Highlights matched rows in respective tables for visual feedback.</li>
    <li>Displays matched results separately for segments and sub-segments.</li>
    <li>Fallback to showing unmatched parentheses content for sub-segments.</li>
    <li>Copy-to-clipboard functionality for results.</li>
  </ul>
</section>

<section>
  <h2>Datasets</h2>
  <p>Two static datasets are used:</p>
  <ul>
    <li><strong>Segments:</strong> List of segments with <code>name</code>, <code>tag</code> (status), and <code>description</code>.</li>
    <li><strong>Sub-segments:</strong> List of sub-segments with <code>name</code>, <code>tag</code> (status), and <code>description</code>.</li>
  </ul>
  <p>Tags include <code>Mapped</code>, <code>Renamed</code>, <code>Remap</code>, and <code>Deleted</code> (excluded from matching).</p>
</section>

<section>
  <h2>Input Handling Rules</h2>
  <h3>Segment Matching</h3>
  <ul>
    <li>Triggers when input string <em>does not contain parentheses</em>.</li>
    <li>Also triggers if parentheses are present but content is <code>all segment</code> or <code>all segments</code>.</li>
    <li>Lookup is done by normalized segment name or description quote.</li>
  </ul>
  <h3>Sub-segment Matching</h3>
  <ul>
    <li>Triggers when input has parentheses with content other than <code>all segment(s)</code>.</li>
    <li>Uses the inner parentheses content normalized, matching sub-segment by name or description quote.</li>
    <li>Supports finding renamed or remapped entries and resolving target names.</li>
    <li>If no match found, returns the parentheses content as is for sub-segments.</li>
  </ul>
</section>

<section>
  <h2>Key Functions</h2>
  <ul>
    <li><code>normalizeText(text)</code>: Decodes HTML entities, trims, replaces dashes, lowers case.</li>
    <li><code>isAllSegmentInParentheses(text)</code>: Returns true if parentheses content is <code>all segment</code> or <code>all segments</code>.</li>
    <li><code>findByNameOrDescriptionQuote(data, searchText)</code>: Finds matching entry by name or quoted description.</li>
    <li><code>findRemapTargetName(remapRow, data)</code>: Resolves the target name for remapped items.</li>
    <li><code>processInput()</code>: Main function to parse input, apply matching logic, highlight rows, and output results.</li>
  </ul>
</section>

<section>
  <h2>Example Input & Expected Behavior</h2>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
    <thead>
      <tr>
        <th>Input</th>
        <th>Matching Type</th>
        <th>Outcome</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>Enterprise Digital Natives</code></td>
        <td>Segment (no parentheses)</td>
        <td>Matches and highlights segment "Enterprise Digital Natives".</td>
      </tr>
      <tr>
        <td><code>Majors Growth (all segment)</code></td>
        <td>Segment (parentheses with 'all segment')</td>
        <td>Matches segment ignoring parentheses content.</td>
      </tr>
      <tr>
        <td><code>Digital Natives (Mapped)</code></td>
        <td>Sub-segment (parentheses with content)</td>
        <td>Matches sub-segment "Digital Natives" by parentheses content.</td>
      </tr>
      <tr>
        <td><code>SME&C - SMB</code></td>
        <td>Sub-segment unmatched</td>
        <td>Displays "Unknown – No match found" for sub-segment.</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h2>How to Use</h2>
  <ol>
    <li>Enter comma-separated input values into the input textarea.</li>
    <li>Click the <code>Process</code> button to apply matching logic.</li>
    <li>View matched segments and sub-segments with visual highlights.</li>
    <li>Use the <code>Copy Segment Results</code> and <code>Copy Sub-segment Results</code> buttons to copy results for further use.</li>
  </ol>
</section>

<section>
  <h2>Limitations & Notes</h2>
  <ul>
    <li>Deleted entries are skipped from matching and display.</li>
    <li>Matching is exact on normalized text or quoted description; no fuzzy matching.</li>
    <li>Case-insensitive and HTML entity decoded normalization is applied for matching robustness.</li>
  </ul>
</section>

<section>
  <h2>Contact & Support</h2>
  <p>For questions or further customization, contact the development team.</p>
</section>

</body>
</html>
