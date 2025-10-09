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
    name: "Major Public Sector  ",
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
    description: 'Renamed to "Strategic - Commercial "',
  },
  { name: "Major - Health", tag: "Deleted", description: "Deleted" },
  {
    name: "Major - State & Local Governments",
    tag: "Deleted",
    description: "Deleted",
  },
  { name: "Strategic - Health", tag: "Deleted", description: "Deleted" },
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
  segmentsTable = createTable(segmentsDataStatic, ["Segment", "Description"]);
  subSegmentsTable = createTable(subSegmentsDataStatic, [
    "Sub-segment",
    "Description",
  ]);

  document.getElementById("segmentsTableContainer").appendChild(segmentsTable);
  document
    .getElementById("subSegmentsTableContainer")
    .appendChild(subSegmentsTable);

  document
    .getElementById("processButton")
    .addEventListener("click", processInput);
});

const decodeHtmlEntities = (text) => {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
};

const normalizeText = (text) => {
  if (!text) return "";
  return decodeHtmlEntities(text).replace(/[-–—]/g, "-").trim().toLowerCase();
};

const extractLastParenthesesContent = (text) => {
  const matches = [...text.matchAll(/\(([^)]+)\)/g)];
  return matches.length ? matches[matches.length - 1][1].trim() : text.trim();
};

const extractTextInQuotes = (text) => {
  const m = text.match(/[“"”](.*?)[”"]/);
  return m ? m[1].trim() : null;
};

const clearHighlights = (tbody) => {
  Array.from(tbody.rows).forEach((row) => {
    row.classList.remove("highlight-name", "mapped", "renamed", "remap");
  });
};

const findRemapTargetName = (remapRow, data) => {
  const desc = remapRow.description.toLowerCase();
  const remapIdx = desc.indexOf("remap to");
  if (remapIdx === -1) return null;

  let targetText = remapRow.description
    .slice(remapIdx + 8)
    .trim()
    .replace(/[.,]$/, "");
  const normTarget = normalizeText(targetText);

  const renamedRow = data.find(
    (s) =>
      s.status.type === "Renamed" &&
      normalizeText(s.description).includes(normTarget)
  );
  return renamedRow ? renamedRow.nameOriginal : null;
};

const getTextOutsideParentheses = (text) =>
  text.replace(/\s*\([^)]*\)/g, "").trim();

const isAllSegmentInParentheses = (text) => {
  const m = text.match(/\(([^)]+)\)/);
  if (!m) return false;
  const val = m[1].toLowerCase();
  return val === "all segment" || val === "all segments";
};

const findByNameOrDescriptionQuote = (data, searchText) =>
  data.find((d) => d.name === searchText) ||
  data.find((d) => d.descriptionQuote === searchText);

const findRenamedByParentheses = (data, parentheses) => {
  if (!parentheses) return null;
  const norm = normalizeText(parentheses);
  return data.find(
    (d) =>
      d.status.type === "renamed" &&
      normalizeText(d.description || "").includes(norm)
  );
};

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
    const treatAsSegment = !parenMatch || isAllSegmentInParentheses(rawVal);
    const valToMatchNormalized = treatAsSegment
      ? normalizeText(getTextOutsideParentheses(rawVal))
      : normalizeText(parenMatch[1].trim());

    let matchSeg = null;
    let matchSub = null;

    // Segment matching only if treatAsSegment true
    if (treatAsSegment) {
      matchSeg = findByNameOrDescriptionQuote(
        segmentsData,
        valToMatchNormalized
      );
    }

    // Sub-segment matching only if input has parentheses and treatAsSegment false
    if (!treatAsSegment && parenMatch) {
      matchSub = findByNameOrDescriptionQuote(
        subSegmentsData,
        valToMatchNormalized
      );

      // If renamed by parentheses for sub-segment
      if (!matchSub) {
        const renamedSub = findRenamedByParentheses(
          subSegmentsData,
          parenMatch[1]
        );
        if (renamedSub) matchSub = renamedSub;
      }
    }

    const li = document.createElement("li");

    // Outcome for full segment input or "(all segment)"
    if (treatAsSegment) {
      const displayText = getTextOutsideParentheses(rawVal);
      li.textContent = displayText;

      if (matchSeg) {
        matchSeg.rowElem.classList.add(
          "highlight-name",
          matchSeg.status.className
        );
        const descSpan = document.createElement("span");
        descSpan.classList.add("found-description");
        descSpan.textContent = ` (Segment) – ${matchSeg.description}`;
        li.appendChild(descSpan);
      } else {
        li.textContent += " – No segment match found";
      }

      resultUl.appendChild(li);
      finalSegResults.push(matchSeg ? matchSeg.nameOriginal : displayText);
      continue;
    }

    // Outcome for sub-segment matching input (with parentheses and not all segment)
    li.textContent = valToMatchNormalized;

    if (matchSub) {
      matchSub.rowElem.classList.add(
        "highlight-name",
        matchSub.status.className
      );
      li.classList.add(matchSub.status.className);
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = ` (Sub-segment) – ${matchSub.description}`;
      li.appendChild(descSpan);
    }

    // Also highlight segment if found (optional, can be removed if you want strict ignore)
    if (matchSeg) {
      matchSeg.rowElem.classList.add(
        "highlight-name",
        matchSeg.status.className
      );
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = ` (Segment) – ${matchSeg.description}`;
      li.appendChild(descSpan);
    }

    // If sub-segment no match, but parentheses present, output the parentheses content as-is
    if (!matchSub && !matchSeg && parenMatch) {
      li.textContent = `${parenMatch[1]} – No match found`;
      finalSubSegResults.push(parenMatch[1]);
      resultUl.appendChild(li);
      continue;
    }

    resultUl.appendChild(li);

    if (!matchSeg && matchSub) {
      if (
        matchSub.status.type === "mapped" ||
        matchSub.status.type === "renamed"
      ) {
        finalSubSegResults.push(matchSub.nameOriginal);
      } else if (matchSub.status.type === "remap") {
        const remapTarget = findRemapTargetName(matchSub, subSegmentsData);
        const targetRow = subSegmentsData.find(
          (d) => d.nameOriginal === remapTarget
        );
        finalSubSegResults.push(
          targetRow ? targetRow.nameOriginal : matchSub.nameOriginal
        );
      } else {
        finalSubSegResults.push(matchSub.nameOriginal);
      }
    }

    if (matchSeg) {
      if (
        matchSeg.status.type === "mapped" ||
        matchSeg.status.type === "renamed"
      ) {
        finalSegResults.push(matchSeg.nameOriginal);
      } else if (matchSeg.status.type === "remap") {
        const remapTarget = findRemapTargetName(matchSeg, segmentsData);
        const targetRow = segmentsData.find(
          (d) => d.nameOriginal === remapTarget
        );
        finalSegResults.push(
          targetRow ? targetRow.nameOriginal : matchSeg.nameOriginal
        );
      } else {
        finalSegResults.push(matchSeg.nameOriginal);
      }
    }
  }

  inputListContainer.appendChild(resultUl);

  finalSubSegOutput.innerHTML = finalSubSegResults.length
    ? `<ul>${finalSubSegResults.map((txt) => `<li>${txt}</li>`).join("")}</ul>`
    : "<p>No sub-segment matches found.</p>";

  finalSegOutput.innerHTML = finalSegResults.length
    ? `<ul>${finalSegResults.map((txt) => `<li>${txt}</li>`).join("")}</ul>`
    : "<p>No segment matches found.</p>";

  document.getElementById(
    "subSegmentCount"
  ).textContent = `Count: ${finalSubSegResults.length}`;
  document.getElementById(
    "segmentCount"
  ).textContent = `Count: ${finalSegResults.length}`;

  document.getElementById("copySubSegment").onclick = () => {
    navigator.clipboard.writeText(finalSubSegResults.join("\n")).then(() => {
      alert("Sub-segment results copied to clipboard.");
    });
  };
  document.getElementById("copySegment").onclick = () => {
    navigator.clipboard.writeText(finalSegResults.join("\n")).then(() => {
      alert("Segment results copied to clipboard.");
    });
  };
}
