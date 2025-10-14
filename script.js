// Static data arrays for segments and sub-segments (KEPT AS IS)
const segmentsDataStatic = [
  {
    name: "Enterprise Digital Natives",
    tag: "Mapped",
    description: "New Mapped to “Enterprise Commercial” Summary Segment",
  },
  {
    name: "Majors Growth Commercial",
    tag: "Mapped",
    description: "New Mapped to “Enterprise Commercial” Summary Segment",
  },
  {
    name: "Majors Growth Public Sector",
    tag: "Mapped",
    description: "New Mapped to “Enterprise Public Sector” Summary Segment",
  },
  {
    name: "SME&C - SMB Commercial",
    tag: "Mapped",
    description: "New Mapped to “SME&C Commercial” Summary Segment",
  },
  {
    name: "SME&C - SMB Public Sector",
    tag: "Mapped",
    description: "New Mapped to “SME&C Public Sector” Summary Segment",
  },
  {
    name: "Major Commercial",
    tag: "Renamed",
    description: "Renamed to “Upper Majors Commercial”",
  },
  {
    name: "Major Public Sector  ",
    tag: "Renamed",
    description: "Renamed to “Upper Majors Public Sector”",
  },
  {
    name: "Small, Medium & Corporate Commercial",
    tag: "Renamed",
    description: "Renamed to “SME&C - Corporate Commercial”",
  },
  {
    name: "Small, Medium & Corporate Public Sector",
    tag: "Renamed",
    description: "Renamed to “SME&C - Corporate Public Sector”",
  },
];

const subSegmentsDataStatic = [
  {
    name: "Digital Natives",
    tag: "Mapped",
    description: "New. Mapped to “Enterprise Digital Natives” Segment",
  },
  {
    name: "Majors Growth - Commercial",
    tag: "Mapped",
    description: "New. Mapped to “Majors Growth Commercial” Segment",
  },
  {
    name: "Majors Growth - Public Sector",
    tag: "Mapped",
    description: "New. Mapped to “Majors Growth Public Sector” Segment",
  },
  {
    name: "SME&C - Corporate K14",
    tag: "Mapped",
    description: "New. Mapped to “SME&C - Corporate Public Sector” Segment",
  },
  {
    name: "SME&C - Corporate TSI",
    tag: "Mapped",
    description: "New. Mapped to “SME&C - Corporate Commercial” Segment",
  },
  {
    name: "Major - Commercial Other",
    tag: "Renamed",
    description: 'Renamed to "Upper Majors - Commercial"',
  },
  {
    name: "Major - Education",
    tag: "Renamed",
    description: "Renamed to “Upper Majors - Education”",
  },
  {
    name: "Major - Federal Government",
    tag: "Renamed",
    description: "Renamed to “Upper Majors - Federal Government”",
  },
  {
    name: "Major - Government Other",
    tag: "Renamed",
    description: "Renamed to “Upper Majors - Government”",
  },
  {
    name: "SM&C Commercial - Corporate",
    tag: "Renamed",
    description: 'Renamed to "SME&C - Corporate Commercial"',
  },
  {
    name: "SM&C Commercial - SMB",
    tag: "Renamed",
    description: 'Renamed to "SME&C - SMB Commercial"',
  },
  {
    name: "SM&C Commercial - SMB Default",
    tag: "Renamed",
    description: 'Renamed to "SME&C Commercial - SMB Default"',
  },
  {
    name: "SM&C Education - Corporate",
    tag: "Renamed",
    description: 'Renamed to "SME&C - Corporate Education"',
  },
  {
    name: "SM&C Education - SMB",
    tag: "Renamed",
    description: 'Renamed to "SME&C - SMB Education"',
  },
  {
    name: "SM&C Government - Corporate",
    tag: "Renamed",
    description: 'Renamed to "SME&C - Corporate Government"',
  },
  {
    name: "SM&C Government - SMB",
    tag: "Renamed",
    description: 'Renamed to "SME&C - SMB Government"',
  },
  {
    name: "Strategic - Commercial Other",
    tag: "Renamed",
    description: 'Renamed to "Strategic - Commercial"',
  },
  { name: "Major - Health", tag: "Deleted", description: "Deleted" },
  {
    name: "Major - State & Local Governments",
    tag: "Deleted",
    description: "Deleted",
  },
  { name: "Strategic - Health", tag: "Deleted", description: "Deleted" },
  {
    name: "SME&C Commercial - SMB Default",
    tag: "Remap",
    description: 'Remap to "SME&C - SMB Commercial Segment"',
  },
  {
    name: "SME&C - SMB Commercial",
    tag: "Remap",
    description: 'Remap to "SME&C - SMB Commercial Segment"',
  },
  {
    name: "SME&C - SMB Education",
    tag: "Remap",
    description: 'Remap to "SME&C - SMB Public Sector Segment"',
  },
  {
    name: "SME&C - SMB Government",
    tag: "Remap",
    description: 'Remap to "SME&C - SMB Public Sector Segment"',
  },
];

// Utility functions (KEPT AS IS)
const decodeHtmlEntities = (text) => {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
};

const normalizeText = (text) => {
  if (!text) return "";
  // Replaced the old regex with a more robust one for quotes and also normalizing spaces
  return decodeHtmlEntities(text)
    .replace(/[-–—]/g, "-")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};

const extractTextInQuotes = (text) => {
  // Matches content inside any of "...", '...', “...”
  const m = text.match(/[“"'”](.*?)[”"']/);
  return m ? m[1].trim() : null;
};

const getTextOutsideParentheses = (text) =>
  text.replace(/\s*\([^)]*\)/g, "").trim();

const isAllSegmentInParentheses = (text) => {
  const m = text.match(/\(([^)]+)\)/);
  if (!m) return false;
  const val = m[1].toLowerCase().trim();
  return val === "all segment" || val === "all segments";
};

const clearHighlights = (tbody) => {
  Array.from(tbody.rows).forEach((row) => {
    row.classList.remove(
      "highlight-name",
      "mapped",
      "renamed",
      "remap",
      "deleted"
    );
  });
};

// ... (createTable function is unchanged as it's purely for setup)
function createTable(data, headers) {
  const table = document.createElement("table");
  table.id = headers[0].toLowerCase().replace(/[\s-]/g, "") + "Table"; // Improved ID generation
  table.setAttribute("aria-label", headers.join(" & ") + " Table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.setAttribute(
      "data-status",
      item.tag ? item.tag.toLowerCase() : "unknown"
    );
    const tdName = document.createElement("td");
    tdName.textContent = item.name;
    const tdDesc = document.createElement("td");
    tdDesc.textContent = item.description;
    tr.appendChild(tdName);
    tr.appendChild(tdDesc);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

// Declare global variables for tables and results (KEPT AS IS)
let segmentsTable;
let subSegmentsTable;

let finalSubSegResults = [];
let finalSegResults = [];

let finalVerticalResults = [];
let finalIndustryResults = [];

// DOMContentLoaded (KEPT AS IS)
document.addEventListener("DOMContentLoaded", () => {
  // build tables
  segmentsTable = createTable(segmentsDataStatic, ["Segment", "Description"]);
  subSegmentsTable = createTable(subSegmentsDataStatic, [
    "Sub-segment",
    "Description",
  ]);
  document.getElementById("segmentsTableContainer").appendChild(segmentsTable);
  document
    .getElementById("subSegmentsTableContainer")
    .appendChild(subSegmentsTable);

  // attach button event handlers with debugging
  const btnSegment = document.getElementById("processButton");
  if (btnSegment) {
    console.log("Attaching processButton click");
    btnSegment.addEventListener("click", () => {
      console.log("processButton clicked");
      processInput();
    });
  }
  const btnIndustry = document.getElementById("industryProcessButton");
  if (btnIndustry) {
    console.log("Attaching industryProcessButton click");
    btnIndustry.addEventListener("click", () => {
      console.log("industryProcessButton clicked");
      processIndustryInput();
    });
  }

  document.getElementById("copySubSegment").onclick = () => {
    navigator.clipboard
      .writeText(finalSubSegResults.join("\n"))
      .then(() => alert("Sub-segment results copied."));
  };
  document.getElementById("copySegment").onclick = () => {
    navigator.clipboard
      .writeText(finalSegResults.join("\n"))
      .then(() => alert("Segment results copied."));
  };
  document.getElementById("copyVertical").onclick = () => {
    navigator.clipboard
      .writeText(finalVerticalResults.join("\n"))
      .then(() => alert("Vertical results copied."));
  };
  document.getElementById("copyIndustry").onclick = () => {
    navigator.clipboard
      .writeText(finalIndustryResults.join("\n"))
      .then(() => alert("Industry results copied."));
  };

  // toggle section visibility
  const radios = document.querySelectorAll('input[name="toolChoice"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "segment") {
        document
          .getElementById("segmentToolSection")
          .classList.remove("hidden");
        document.getElementById("industryToolSection").classList.add("hidden");
      } else {
        document
          .getElementById("industryToolSection")
          .classList.remove("hidden");
        document.getElementById("segmentToolSection").classList.add("hidden");
      }
    });
  });
});

// --- Part 1: Refactored Segment & Sub-segment Processing ---

/**
 * Creates an array of searchable objects from an HTML table's rows.
 * Separates data processing from DOM structure.
 * @param {string} tableId The ID of the HTML table (e.g., 'segmentTable').
 * @param {Array<Object>} staticData The initial static data array.
 * @returns {Array<Object>} The mapped searchable data array.
 */
const getSearchableData = (tableId, staticData) => {
  const table = document.getElementById(tableId);
  if (!table || !table.tBodies[0]) return [];

  return Array.from(table.tBodies[0].rows).map((row, index) => {
    const nameOriginal = row.cells[0].textContent;
    const description = row.cells[1].textContent;
    const statusType = row.getAttribute("data-status");

    return {
      // Keep a reference to the DOM element for later highlighting
      rowElem: row,
      // Original, clean name
      nameOriginal,
      // Normalized name for primary matching
      nameNormalized: normalizeText(nameOriginal),
      // Original description text
      description,
      // Normalized name extracted from quotes in the description for secondary matching (e.g., 'Renamed to "X"')
      descriptionQuoteNormalized: normalizeText(
        extractTextInQuotes(description)
      ),
      status: {
        type: statusType,
        className: statusType,
      },
      // Include the original static data item if needed, useful for testability
      staticItem: staticData[index],
    };
  });
};

/**
 * Encapsulates the core matching logic for a single input item against
 * the segment and sub-segment datasets, implementing the Mapped-Priority rule.
 * @param {string} rawInputItem The raw string input item (e.g., 'Industry A (Vertical B)').
 * @param {Array<Object>} segmentsData The searchable segments data.
 * @param {Array<Object>} subSegmentsData The searchable sub-segments data.
 * @returns {Object} The matching result object.
 */
const findSegmentMatch = (rawInputItem, segmentsData, subSegmentsData) => {
  const parenMatch = rawInputItem.match(/\(([^)]+)\)/);
  const treatAsSegment = !parenMatch || isAllSegmentInParentheses(rawInputItem);

  let valToMatchNormalized;
  let displayText;

  if (treatAsSegment) {
    displayText = getTextOutsideParentheses(rawInputItem);
    valToMatchNormalized = normalizeText(displayText);
  } else {
    // Match on content inside parentheses for sub-segments
    displayText = parenMatch[1].trim();
    valToMatchNormalized = normalizeText(displayText);
  }

  let matchType = "none";
  let matchedItem = null;

  if (treatAsSegment) {
    // --- Segment Logic (KEPT AS IS) ---
    matchedItem = segmentsData.find(
      (d) =>
        d.nameNormalized === valToMatchNormalized ||
        d.descriptionQuoteNormalized === valToMatchNormalized
    );
    if (matchedItem) {
      matchType = "segment";
    }
  } else {
    // --- Sub-segment Logic (MODIFIED) ---

    // 1. Filter data to only include Mapped or Renamed items
    const eligibleSubSegments = subSegmentsData.filter(
      (d) =>
        d.status.type.toLowerCase() === "mapped" ||
        d.status.type.toLowerCase() === "renamed"
    );

    // Priority 1: Direct exact NAME match AND status is "Mapped"
    let potentialSubSegmentMatch = eligibleSubSegments.find(
      (d) =>
        d.nameNormalized === valToMatchNormalized &&
        d.status.type.toLowerCase() === "mapped"
    );

    if (potentialSubSegmentMatch) {
      matchedItem = potentialSubSegmentMatch;
      matchType = "subsegment";
    } else {
      // Priority 2: Exact DESCRIPTION QUOTE match AND status is "Renamed"
      potentialSubSegmentMatch = eligibleSubSegments.find(
        (d) =>
          d.descriptionQuoteNormalized === valToMatchNormalized &&
          d.status.type.toLowerCase() === "renamed"
      );

      if (potentialSubSegmentMatch) {
        matchedItem = potentialSubSegmentMatch;
        matchType = "subsegment";
      }
    }

    // Fallback: If still no sub-segment match, fallback to segment match (KEPT AS IS)
    if (matchType === "none") {
      const segmentMatch = segmentsData.find(
        (d) =>
          d.nameNormalized === valToMatchNormalized ||
          d.descriptionQuoteNormalized === valToMatchNormalized
      );
      if (segmentMatch) {
        matchedItem = segmentMatch;
        matchType = "segment";
      }
    }
  }

  return {
    matchType,
    matchedItem,
    displayText,
    treatAsSegment,
    rawInputItem,
  };
};

/**
 * Renders a single list item in the input list based on the match result.
 * @param {HTMLElement} ulContainer The UL element to append the LI to.
 * @param {Object} matchResult The result from findSegmentMatch.
 * @param {Array<string>} finalSegResultsRef The array to push final Segment results to.
 * @param {Array<string>} finalSubSegResultsRef The array to push final Sub-segment results to.
 */
const renderSegmentMatchResult = (
  ulContainer,
  { matchType, matchedItem, displayText, treatAsSegment, rawInputItem },
  finalSegResultsRef,
  finalSubSegResultsRef
) => {
  const li = document.createElement("li");

  if (treatAsSegment) {
    // --- Segment Logic ---
    li.textContent = displayText;
    if (matchedItem) {
      // Highlight the DOM row
      matchedItem.rowElem.classList.add(
        "highlight-name",
        matchedItem.status.className
      );
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = ` (Segment) – ${matchedItem.description}`;
      li.appendChild(descSpan);
      finalSegResultsRef.push(matchedItem.nameOriginal);
    } else {
      li.textContent += " – No segment match found";
      finalSegResultsRef.push(displayText); // Push the original text if no match
    }
  } else {
    // --- Sub-segment Logic ---
    if (matchedItem) {
      const typeLabel = matchType === "subsegment" ? "Sub-segment" : "Segment";
      const pushArray =
        matchType === "subsegment" ? finalSubSegResultsRef : finalSegResultsRef;
      const outputName = matchedItem.nameOriginal;

      li.textContent = displayText; // Text from inside parentheses
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = ` (${typeLabel}) – ${matchedItem.description}`;
      li.appendChild(descSpan);
      li.classList.add(matchedItem.status.className);

      if (matchType === "subsegment") {
        // Any subsegment match that reaches here is valid based on the new logic
        matchedItem.rowElem.classList.add(
          "highlight-name",
          matchedItem.status.className
        );
        if (!pushArray.includes(outputName)) {
          pushArray.push(outputName);
        }
      } else {
        // If the match fell back to a Segment (matchType === 'segment'), output the Segment name
        matchedItem.rowElem.classList.add(
          "highlight-name",
          matchedItem.status.className
        );
        if (!pushArray.includes(outputName)) {
          pushArray.push(outputName);
        }
      }
    } else {
      // No match found for the content inside parentheses
      li.textContent = `${displayText} – No match found`;
      finalSubSegResultsRef.push(displayText);
    }
  }

  ulContainer.appendChild(li);
};

/**
 * Main function for processing segment/sub-segment input.
 * Now streamlined to coordinate helper functions and handle DOM updates.
 */
function processInput() {
  const rawInput = document.getElementById("userInput").value.trim();
  const inputListContainer = document.getElementById("inputList");
  const finalSubSegOutput = document.getElementById("finalSubSegmentOutput");
  const finalSegOutput = document.getElementById("finalSegmentOutput");

  // 1. Reset State and UI
  inputListContainer.innerHTML = "";
  finalSubSegOutput.innerHTML = "";
  finalSegOutput.innerHTML = "";
  finalSubSegResults = [];
  finalSegResults = [];

  if (!rawInput) {
    inputListContainer.innerHTML = "<p>No input provided.</p>";
    return;
  }

  clearHighlights(segmentsTable.tBodies[0]);
  clearHighlights(subSegmentsTable.tBodies[0]);

  // 2. Prepare Data
  const rawItems = rawInput
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i);
  const segmentsData = getSearchableData("segmentTable", segmentsDataStatic);
  const subSegmentsData = getSearchableData(
    "subsegmentTable",
    subSegmentsDataStatic
  );

  // 3. Process and Render
  const resultUl = document.createElement("ul");

  for (const rawVal of rawItems) {
    const matchResult = findSegmentMatch(rawVal, segmentsData, subSegmentsData);
    renderSegmentMatchResult(
      resultUl,
      matchResult,
      finalSegResults,
      finalSubSegResults
    );
  }

  inputListContainer.appendChild(resultUl);

  // 4. Final Output Rendering
  const renderFinalOutput = (results, outputElement, countElement, label) => {
    const dedupedResults = Array.from(new Set(results));
    outputElement.innerHTML = dedupedResults.length
      ? `<ul>${dedupedResults.map((txt) => `<li>${txt}</li>`).join("")}</ul>`
      : `<p>No ${label.toLowerCase()} matches found.</p>`;
    countElement.textContent = `Count: ${dedupedResults.length}`;
  };

  renderFinalOutput(
    finalSubSegResults,
    finalSubSegOutput,
    document.getElementById("subSegmentCount"),
    "sub-segment"
  );
  renderFinalOutput(
    finalSegResults,
    finalSegOutput,
    document.getElementById("segmentCount"),
    "segment"
  );
}

// --- Part 2: Refactored Industry/Vertical Processing (UNCHANGED) ---

/**
 * Parses, filters, and deduplicates the raw industry/vertical input list.
 * Implements the crucial "All Verticals" rule.
 * @param {Array<string>} rawInputList Array of raw string inputs.
 * @returns {{industries: string[], verticals: string[]}} Object containing deduplicated, filtered arrays.
 */
const extractIndustryAndVertical = (rawInputList) => {
  const industriesWithAllVerticals = new Set();
  const industryCandidates = [];
  const verticalCandidates = [];

  // Step 1: Clean and Parse Input
  const cleanedItems = rawInputList
    .map((i) => i.replace(/\(Deprecated\)/gi, "").trim())
    .filter((i) => i);

  // Step 2: Identify all industries listed with "(All Verticals)"
  cleanedItems.forEach((i) => {
    const parenMatch = i.match(/\(([^)]+)\)/);
    const industryName = getTextOutsideParentheses(i);

    if (parenMatch && parenMatch[1].trim().toLowerCase() === "all verticals") {
      industriesWithAllVerticals.add(industryName.toLowerCase());
      industryCandidates.push(industryName);
    }
  });

  // Step 3: Apply the "All Verticals" filtering rule and collect final candidates
  cleanedItems.forEach((i) => {
    const parenMatch = i.match(/\(([^)]+)\)/);
    const industryName = getTextOutsideParentheses(i);
    const verticalName = parenMatch ? parenMatch[1].trim() : null;
    const isAllVerticals =
      verticalName && verticalName.toLowerCase() === "all verticals";

    if (!parenMatch) {
      // No parentheses, cannot determine type, we just ignore for final results (or could log an error)
      return;
    }

    if (isAllVerticals) {
      // Already added to candidates in Step 2
      return;
    }

    // If a specific vertical is for an industry that has "(All Verticals)", discard it.
    if (industriesWithAllVerticals.has(industryName.toLowerCase())) {
      return;
    }

    // It's a valid specific Vertical
    verticalCandidates.push(verticalName);
  });

  // Step 4: Deduplicate and return
  return {
    industries: Array.from(new Set(industryCandidates)),
    verticals: Array.from(new Set(verticalCandidates)),
  };
};

/**
 * Main function for processing industry/vertical input.
 * Now streamlined to call extractIndustryAndVertical and focus purely on DOM rendering.
 */
function processIndustryInput() {
  const rawInput = document.getElementById("industryUserInput").value.trim();
  const inputListContainer = document.getElementById("industryInputList");
  const finalVerticalOutput = document.getElementById("finalVerticalOutput");
  const finalIndustryOutput = document.getElementById("finalIndustryOutput");

  // 1. Reset State and UI
  inputListContainer.innerHTML = "";
  finalVerticalOutput.innerHTML = "";
  finalIndustryOutput.innerHTML = "";
  finalVerticalResults = [];
  finalIndustryResults = [];

  if (!rawInput) {
    inputListContainer.innerHTML = "<p>No input provided.</p>";
    return;
  }

  // 2. Data Processing (Delegated to helper)
  const rawItems = rawInput
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i);
  const { industries, verticals } = extractIndustryAndVertical(rawItems);

  finalIndustryResults = industries;
  finalVerticalResults = verticals;

  // 3. Input List Rendering (for immediate user feedback)
  const resultUl = document.createElement("ul");
  industries.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = `${name} (Industry)`;
    resultUl.appendChild(li);
  });
  verticals.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = `${name} (Vertical)`;
    resultUl.appendChild(li);
  });

  // Add list items for any raw input that was filtered out due to the "All Verticals" rule or had no parens (for feedback)
  const allResultNames = new Set([...industries, ...verticals]);
  rawItems.forEach((rawItem) => {
    const cleanedItem = rawItem.replace(/\(Deprecated\)/gi, "").trim();
    const parenMatch = cleanedItem.match(/\(([^)]+)\)/);

    if (!parenMatch) {
      const li = document.createElement("li");
      li.textContent = `${rawItem} – No parentheses found, cannot determine Industry or Vertical (Filtered)`;
      resultUl.appendChild(li);
      return;
    }

    const industryName = getTextOutsideParentheses(cleanedItem);
    const verticalName = parenMatch[1].trim();

    if (
      verticalName.toLowerCase() !== "all verticals" &&
      industries
        .map((i) => i.toLowerCase())
        .includes(industryName.toLowerCase())
    ) {
      const li = document.createElement("li");
      li.textContent = `${rawItem} – Vertical discarded (Industry listed with "All Verticals")`;
      li.classList.add("discarded-item");
      resultUl.appendChild(li);
    }
  });

  inputListContainer.appendChild(resultUl);

  // 4. Final Output Rendering
  const renderFinalOutput = (results, outputElement, countElement, label) => {
    outputElement.innerHTML = results.length
      ? `<ul>${results.map((txt) => `<li>${txt}</li>`).join("")}</ul>`
      : `<p>No ${label.toLowerCase()} found.</p>`;
    countElement.textContent = `Count: ${results.length}`;
  };

  renderFinalOutput(
    finalVerticalResults,
    finalVerticalOutput,
    document.getElementById("verticalCount"),
    "verticals"
  );
  renderFinalOutput(
    finalIndustryResults,
    finalIndustryOutput,
    document.getElementById("industryCount"),
    "industries"
  );
}
