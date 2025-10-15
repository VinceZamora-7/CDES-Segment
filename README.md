<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>

<h1>Segment & Data Mapping Tool</h1>

<section>
  <h2>Overview</h2>
  <p>This tool is designed to process and map two distinct types of user input: **Segments/Sub-segments** and **Industries/Verticals**. It applies specific, priority-based matching rules to resolve modern data categories from historical or raw input strings.</p>
</section>

<section>
  <h2>Tool Selection & Datasets</h2>
  <p>Use the radio buttons to switch between the two distinct processing modes:</p>
  <ul>
    <li>
      <strong>Segment & Sub-segment Tool:</strong> Maps input against the **Segments** and **Sub-segments** static tables (visible below).
    </li>
    <li>
      <strong>Industry & Vertical Tool:</strong> Processes input to extract Industries and Verticals based on a strict **"All Verticals"** hierarchy rule.
    </li>
  </ul>
  <p>Entry tags include <code>Mapped</code>, <code>Renamed</code>, <code>Remap</code>, and <code>Deleted</code> (excluded from matching).</p>
</section>

<section>
  <h2>1. Segment & Sub-segment Processing Rules</h2>
  <p>Input is processed as a sub-segment first if it contains content within parentheses. If no match is found, it attempts to match the content against the Segment list.</p>

  <h3>A. Segment Matching (Priority when no parentheses or 'All Segment')</h3>
  <ul>
    <li>Triggers when the input string **does not contain parentheses** OR parentheses contain <code>all segment</code> or <code>all segments</code>.</li>
    <li>Lookup is done by normalized segment **Name** or **Description Quote**.</li>
  </ul>

  <h3>B. Sub-segment Matching (Priority when parentheses are present)</h3>
  <ul>
    <li>Triggers when input has parentheses with content other than <code>all segment(s)</code>. The content inside the parentheses is used for the lookup key.</li>
    <li><strong>Priority 1 (Mapped-First):</strong> Search for an exact match against the sub-segment **Name** AND the entry **Tag is Mapped**.</li>
    <li><strong>Priority 2 (Renamed-Second):</strong> If Priority 1 fails, search for an exact match against the sub-segment **Description Quote** AND the entry **Tag is Renamed**.</li>
    <li>If a sub-segment is matched, the corresponding row is highlighted.</li>
    <li>If **no sub-segment match** is found, the normalized parentheses content attempts to match against the **Segment** list as a final fallback.</li>
    <li>If still no match, the original parentheses content is returned as an unmatched Sub-segment.</li>
  </ul>
</section>

<section>
  <h2>2. Industry & Vertical Processing Rules</h2>
  <p>This tool enforces a strict rule to ensure data integrity when grouping specific verticals under a broad industry. Input strings must be in the format: <code>Industry Name (Vertical Name)</code>.</p>

  <h3>The "All Verticals" Rule (Filtering)</h3>
  <ul>
    <li>If an Industry is listed in the input as **`Industry X (All Verticals)`**, that **Industry** is included in the final results.</li>
    <li>Crucially, **ANY** other input listing a specific Vertical under **`Industry X`** (e.g., `Industry X (Specific Vertical 1)`) is **automatically discarded** to prevent mixing broad and specific scopes for the same Industry.</li>
    <li>All remaining specific Verticals (i.e., those not under an "All Verticals" Industry) are collected and deduplicated.</li>
    <li>The input is split by the delimiter <code>),</code> to correctly process multi-line or complex input strings.</li>
  </ul>
</section>

<section>
  <h2>Example Inputs & Expected Behavior</h2>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
    <thead>
      <tr>
        <th>Input String</th>
        <th>Tool Mode</th>
        <th>Outcome</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>Major Commercial</code></td>
        <td>Segment/Sub-segment</td>
        <td>Matches Segment **"Major Commercial"**. Output: Upper Majors Commercial. (Renamed rule)</td>
      </tr>
      <tr>
        <td><code>Digital Natives</code></td>
        <td>Segment/Sub-segment</td>
        <td>Matches Segment **"Enterprise Digital Natives"**. Output: Enterprise Digital Natives. (Mapped rule)</td>
      </tr>
      <tr>
        <td><code>Major - Education</code></td>
        <td>Segment/Sub-segment</td>
        <td>Matches Sub-segment **"Major - Education"**. Output: Upper Majors - Education. (Renamed rule on Sub-segment)</td>
      </tr>
      <tr>
        <td><code>Health (All Verticals), Health (Hospitals)</code></td>
        <td>Industry/Vertical</td>
        <td>Output: **Industry**: Health. **Vertical**: None. (The specific vertical "Hospitals" is filtered out by the "All Verticals" rule.)</td>
      </tr>
      <tr>
        <td><code>Retail (Fashion), Finance (Banking)</code></td>
        <td>Industry/Vertical</td>
        <td>Output: **Industry**: Retail, Finance. **Vertical**: Fashion, Banking.</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h2>Features & Utilities</h2>
  <ul>
    <li>**Normalization:** Case-insensitive, HTML entity decoded, and dash-normalized text is used for robust matching.</li>
    <li>**Visual Feedback:** Matched rows in the static tables are highlighted with a color corresponding to their tag (Mapped, Renamed, etc.).</li>
    <li>**Output Management:** Final results are deduplicated and can be copied to the clipboard.</li>
    <li>**Filtering:** Entries marked as <code>Deleted</code> are automatically ignored by the matching logic.</li>
  </ul>
</section>

<section>
  <h2>How to Use</h2>
  <ol>
    <li>Select the appropriate **tool mode** (Segment or Industry).</li>
    <li>Enter comma-separated input values into the input textarea.</li>
    <li>Click the <code>Process</code> button to apply matching logic.</li>
    <li>View the matched results and use the <code>Copy Results</code> buttons for further use.</li>
  </ol>
</section>

<section>
  <h2>Contact & Support</h2>
  <p>For questions or further customization, contact the development team.</p>
</section>

</body>
</html>
