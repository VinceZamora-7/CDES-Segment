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
  table.id = headers[0].toLowerCase().replace(/\s/g, "") + "Table";
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

function getTextOutsideParentheses(text) {
  return text.replace(/\s*\([^)]*\)/g, "").trim();
}

function isAllSegmentInParentheses(text) {
  const parenMatch = text.match(/\(([^)]+)\)/);
  if (!parenMatch) return false;
  const val = parenMatch[1].toLowerCase();
  return val === "all segment" || val === "all segments";
}

function findByNameOrDescriptionQuote(data, searchText) {
  return (
    data.find((d) => d.name === searchText) ||
    data.find((d) => d.descriptionQuote === searchText)
  );
}

function findRenamedByParentheses(data, parentheses) {
  if (!parentheses) return null;
  const normParen = normalizeText(parentheses);
  return data.find(
    (d) =>
      d.status.type === "renamed" &&
      normalizeText(d.description || "").includes(normParen)
  );
}

function processInput() {
  const rawInput = document.getElementById("userInput").value.trim();
  const inputListContainer = document.getElementById("inputList");
  const finalSubSegOutput = document.getElementById("finalSubSegmentOutput");
  const finalSegOutput = document.getElementById("finalSegmentOutput");

  inputListContainer.innerHTML = "";
  finalSubSegOutput.innerHTML = "";
  finalSegOutput.innerHTML = "";

  if (!rawInput) {
    inputListContainer.innerHTML = "<p>No input provided.</p>";
    return;
  }

  clearHighlights(segmentsTable.tBodies[0]);
  clearHighlights(subSegmentsTable.tBodies[0]);

  const rawItems = rawInput.split(",").map((i) => i.trim());
  const segmentsData = Array.from(segmentsTable.tBodies[0].rows).map((row) => ({
    rowElem: row,
    nameOriginal: row.cells[0].textContent,
    name: normalizeText(row.cells[0].textContent),
    description: row.cells[1].textContent,
    descriptionQuote: normalizeText(
      extractTextInQuotes(row.cells[1].textContent)
    ),
    status: {
      type: row.getAttribute("data-status"),
      className: row.getAttribute("data-status"),
    },
  }));
  const subSegmentsData = Array.from(subSegmentsTable.tBodies[0].rows).map(
    (row) => ({
      rowElem: row,
      nameOriginal: row.cells[0].textContent,
      name: normalizeText(row.cells[0].textContent),
      description: row.cells[1].textContent,
      descriptionQuote: normalizeText(
        extractTextInQuotes(row.cells[1].textContent)
      ),
      status: {
        type: row.getAttribute("data-status"),
        className: row.getAttribute("data-status"),
      },
    })
  );

  const finalSubSegResults = [];
  const finalSegResults = [];
  const resultUl = document.createElement("ul");

  for (const rawVal of rawItems) {
    const parenMatch = rawVal.match(/\(([^)]+)\)/);
    // condition: If no parentheses OR parentheses content is "all segment(s)"
    const treatAsSegment = !parenMatch || isAllSegmentInParentheses(rawVal);

    // match key is text outside parentheses for segment case, else parentheses content or original text for others
    const valToMatchNormalized = treatAsSegment
      ? normalizeText(getTextOutsideParentheses(rawVal))
      : normalizeText(extractInParenthesesOrOriginal(rawVal));

    let matchSeg = findByNameOrDescriptionQuote(
      segmentsData,
      valToMatchNormalized
    );
    let matchSub = findByNameOrDescriptionQuote(
      subSegmentsData,
      valToMatchNormalized
    );

    // For non-segment treated inputs, check also renamed by parentheses
    if (!treatAsSegment && parenMatch) {
      const renamedSub = findRenamedByParentheses(
        subSegmentsData,
        parenMatch[1]
      );
      if (renamedSub) matchSub = renamedSub;
      const renamedSeg = findRenamedByParentheses(segmentsData, parenMatch[1]);
      if (renamedSeg) matchSeg = renamedSeg;
    }

    const li = document.createElement("li");

    if (treatAsSegment) {
      // Show only text outside parentheses in segment output
      const displayText = getTextOutsideParentheses(rawVal);
      li.textContent = displayText;

      if (matchSeg) {
        matchSeg.rowElem.classList.add(
          "highlight-name",
          matchSeg.status.className
        );
        const descSpan = document.createElement("span");
        descSpan.classList.add("found-description");
        descSpan.textContent = " (Segment) – " + matchSeg.description;
        li.appendChild(descSpan);
      } else {
        li.textContent += " – No segment match found";
      }

      resultUl.appendChild(li);
      finalSegResults.push(displayText);

      // Skip adding to sub-segment
      continue;
    }

    // Normal handling for sub-segment inputs
    li.textContent = valToMatchNormalized;

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

    if (!matchSeg && matchSub) {
      let finalText = "";
      switch (matchSub.status.type) {
        case "mapped":
        case "renamed":
          finalText = matchSub.nameOriginal;
          break;
        case "remap":
          finalText =
            findRemapTargetName(matchSub, subSegmentsData) ||
            valToMatchNormalized;
          break;
        default:
          finalText = valToMatchNormalized;
      }
      finalSubSegResults.push(finalText);
    }

    if (matchSeg) {
      let finalText = "";
      switch (matchSeg.status.type) {
        case "mapped":
        case "renamed":
          finalText = matchSeg.nameOriginal;
          break;
        case "remap":
          finalText =
            findRemapTargetName(matchSeg, segmentsData) || valToMatchNormalized;
          break;
        default:
          finalText = valToMatchNormalized;
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

  document.getElementById(
    "subSegmentCount"
  ).textContent = `Count: ${finalSubSegResults.length}`;
  document.getElementById(
    "segmentCount"
  ).textContent = `Count: ${finalSegResults.length}`;

  // Copy button handlers
  document.getElementById("copySubSegment").onclick = () => {
    const text = finalSubSegResults.join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Sub-segment results copied to clipboard."));
  };
  document.getElementById("copySegment").onclick = () => {
    const text = finalSegResults.join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Segment results copied to clipboard."));
  };
}
