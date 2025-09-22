// Data arrays for dynamic table creation
// Data arrays for dynamic table creation
const segmentsDataStatic = [
  {
    name: "High Value Individual",
    tag: "Mapped",
    description: "New Mapped to “High Value Individual” Summary Segment",
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
    description: 'Renamed to "Strategic - Commercial "',
  },
  {
    name: "Major - Health",
    tag: "Deleted",
    description: "Deleted",
  },
  {
    name: "Major - State & Local Governments",
    tag: "Deleted",
    description: "Deleted",
  },
  {
    name: "Strategic - Health",
    tag: "Deleted",
    description: "Deleted",
  },
  {
    name: "SME&C Commercial – SMB Default",
    tag: "Remap",
    description: "Remap to SME&C - SMB Commercial Segment",
  },
  {
    name: "SME&C - SMB Commercial",
    tag: "Remap",
    description: "Remap to SME&C - SMB Commercial Segment",
  },
  {
    name: "SME&C - SMB Education",
    tag: "Remap",
    description: "Remap to SME&C - SMB Public Sector Segment",
  },
  {
    name: "SME&C - SMB Government",
    tag: "Remap",
    description: "Remap to SME&C - SMB Public Sector Segment",
  },
];

// Global table references
let segmentsTable;
let subSegmentsTable;

function createTable(data, headers) {
  const table = document.createElement("table");
  table.id = headers[0].toLowerCase().replace(/ /g, "") + "Table";
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

document.addEventListener("DOMContentLoaded", () => {
  const segmentsContainer = document.getElementById("segmentsTableContainer");
  const subSegmentsContainer = document.getElementById(
    "subSegmentsTableContainer"
  );

  segmentsTable = createTable(segmentsDataStatic, ["Segment", "Description"]);
  subSegmentsTable = createTable(subSegmentsDataStatic, [
    "Sub-segment",
    "Description",
  ]);

  segmentsContainer.appendChild(segmentsTable);
  subSegmentsContainer.appendChild(subSegmentsTable);

  document
    .getElementById("processButton")
    .addEventListener("click", processInput);
});

function decodeHtmlEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function normalizeText(text) {
  if (!text) return "";
  return decodeHtmlEntities(text).replace(/[-–—]/g, "-").trim().toLowerCase();
}

function extractInParenthesesOrOriginal(text) {
  const matches = [...text.matchAll(/\(([^)]+)\)/g)];
  return matches.length ? matches[matches.length - 1][1].trim() : text.trim();
}

function extractTextInQuotes(text) {
  const match = text.match(/[“"”](.*?)[”"]/);
  return match ? match[1].trim() : null;
}

function clearHighlights(tbody) {
  for (const row of tbody.rows) {
    row.classList.remove("highlight-name", "mapped", "renamed", "remap");
  }
}

function findRemapTargetName(remapRow, data) {
  const desc = remapRow.description.toLowerCase();
  const remapIdx = desc.indexOf("remap to");
  if (remapIdx === -1) return null;
  let targetText = remapRow.description.slice(remapIdx + 8).trim();
  targetText = targetText.replace(/[.,]$/, "").trim();
  const normTarget = normalizeText(targetText);
  const renamedRow = data.find(
    (s) =>
      s.status.type === "Renamed" &&
      normalizeText(s.description).includes(normTarget)
  );
  return renamedRow ? renamedRow.nameOriginal : null;
}

function processInput() {
  const rawInput = document.getElementById("userInput").value.trim();
  const inputListContainer = document.getElementById("inputList");
  const finalSubSegOutput = document.getElementById("finalSubSegmentOutput");
  const finalSegOutput = document.getElementById("finalSegmentOutput");

  const segmentsBody = segmentsTable.tBodies[0];
  const subSegmentsBody = subSegmentsTable.tBodies[0];

  inputListContainer.innerHTML = "";
  finalSubSegOutput.innerHTML = "";
  finalSegOutput.innerHTML = "";
  clearHighlights(subSegmentsBody);
  clearHighlights(segmentsBody);

  if (!rawInput) {
    inputListContainer.innerHTML = "<p>No input provided.</p>";
    return;
  }

  const rawItems = rawInput.split(",").map((i) => i.trim());
  const extractedValues = rawItems.map(extractInParenthesesOrOriginal);

  // Build segments data with descriptionParentheses and tag info
  const segmentsData = Array.from(segmentsBody.rows).map((row) => {
    const desc = row.cells[1].textContent;
    const matches = [...desc.matchAll(/\(([^)]+)\)/g)];
    const descriptionParentheses = matches.length
      ? matches[matches.length - 1][1].trim()
      : null;
    const tag = row.getAttribute("data-status") || "";

    return {
      rowElem: row,
      nameOriginal: row.cells[0].textContent,
      name: normalizeText(row.cells[0].textContent),
      description: desc,
      descriptionQuote: extractTextInQuotes(desc),
      status: { type: tag, className: tag },
      descriptionParentheses,
    };
  });

  // Similar for sub-segments
  const subSegmentsData = Array.from(subSegmentsBody.rows).map((row) => {
    const desc = row.cells[1].textContent;
    const matches = [...desc.matchAll(/\(([^)]+)\)/g)];
    const descriptionParentheses = matches.length
      ? matches[matches.length - 1][1].trim()
      : null;
    const tag = row.getAttribute("data-status") || "";

    return {
      rowElem: row,
      nameOriginal: row.cells[0].textContent,
      name: normalizeText(row.cells[0].textContent),
      description: desc,
      descriptionQuote: extractTextInQuotes(desc),
      status: { type: tag, className: tag },
      descriptionParentheses,
    };
  });

  // Helper: find renamed match by parentheses in the data
  function findRenamedByParentheses(data, parentheses) {
    if (!parentheses) return null;
    const normParen = normalizeText(parentheses);
    return data.find(
      (d) =>
        d.status.type === "renamed" &&
        normalizeText(d.description || "").includes(normParen)
    );
  }

  const resultUl = document.createElement("ul");
  const finalSubSegResults = [];
  const finalSegResults = [];

  for (let i = 0; i < extractedValues.length; i++) {
    const val = extractedValues[i];
    const rawVal = rawItems[i];
    const normVal = normalizeText(val);

    // Attempt to find segment match
    let matchSeg =
      segmentsData.find((s) => s.name === normVal) ||
      segmentsData.find(
        (s) =>
          s.descriptionQuote && normalizeText(s.descriptionQuote) === normVal
      );

    // Attempt to find sub-segment match
    let matchSub =
      subSegmentsData.find((s) => s.name === normVal) ||
      subSegmentsData.find(
        (s) =>
          s.descriptionQuote && normalizeText(s.descriptionQuote) === normVal
      );

    // If parentheses exist in input (rawVal), try to find renamed in subsegment first by parentheses
    const parenthesesInput = rawVal.match(/\(([^)]+)\)/);
    if (parenthesesInput) {
      const renamedSub = findRenamedByParentheses(
        subSegmentsData,
        parenthesesInput[1]
      );
      if (renamedSub) {
        matchSub = renamedSub;
      }
      const renamedSeg = findRenamedByParentheses(
        segmentsData,
        parenthesesInput[1]
      );
      if (renamedSeg) {
        matchSeg = renamedSeg;
      }
    }

    // Don't duplicate: if matched in segment, don't add that input to subsegment results
    const isInSegment = !!matchSeg;

    const li = document.createElement("li");
    li.textContent = val;

    if (matchSub) {
      matchSub.rowElem.classList.add(
        "highlight-name",
        matchSub.status.className
      );
      li.classList.add(matchSub.status.className);
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = " (Sub-segment) – " + matchSub.description;
      li.appendChild(descSpan);
    }

    if (matchSeg) {
      matchSeg.rowElem.classList.add(
        "highlight-name",
        matchSeg.status.className
      );
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = " (Segment) – " + matchSeg.description;
      li.appendChild(descSpan);
    }

    if (!matchSub && !matchSeg) {
      li.textContent += " – No match found";
    }

    resultUl.appendChild(li);

    // Add to subsegment result only if not matched in segment already
    if (!isInSegment) {
      if (matchSub) {
        let finalText = "";
        switch (matchSub.status.type) {
          case "mapped":
          case "renamed":
            finalText = matchSub.nameOriginal;
            break;
          case "remap":
            const targetNameSub = findRemapTargetName(
              matchSub,
              subSegmentsData
            );
            finalText = targetNameSub || val;
            break;
          default:
            finalText = val;
        }
        finalSubSegResults.push(finalText);
      } else if (rawVal.includes("(") && rawVal.includes(")")) {
        finalSubSegResults.push(val);
      }
    }

    if (matchSeg) {
      let finalText = "";
      switch (matchSeg.status.type) {
        case "mapped":
        case "renamed":
          finalText = matchSeg.nameOriginal;
          break;
        case "remap":
          const targetNameSeg = findRemapTargetName(matchSeg, segmentsData);
          finalText = targetNameSeg || val;
          break;
        default:
          finalText = val;
      }
      finalSegResults.push(finalText);
    }
  }

  inputListContainer.appendChild(resultUl);

  if (finalSubSegResults.length) {
    const subUl = document.createElement("ul");
    finalSubSegResults.forEach((txt) => {
      const li = document.createElement("li");
      li.textContent = txt;
      subUl.appendChild(li);
    });
    finalSubSegOutput.appendChild(subUl);
  } else {
    finalSubSegOutput.innerHTML = "<p>No sub-segment matches found.</p>";
  }

  if (finalSegResults.length) {
    const segUl = document.createElement("ul");
    finalSegResults.forEach((txt) => {
      const li = document.createElement("li");
      li.textContent = txt;
      segUl.appendChild(li);
    });
    finalSegOutput.appendChild(segUl);
  } else {
    finalSegOutput.innerHTML = "<p>No segment matches found.</p>";
  }
}
