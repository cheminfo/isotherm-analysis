function findDataBlocks(lines) {
  let isothermTableStarts = [];
  let isothermTableEnds = [];

  let isIsothermTable = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match('Isotherm Tabular Report')) {
      isIsothermTable = true;
      isothermTableStarts.push(i);
    }

    if (isIsothermTable && lines[i].match('Micromeritics')) {
      isothermTableEnds.push(i);
      isIsothermTable = false;
    }
  }

  return [isothermTableStarts, isothermTableEnds];
}

//export function fromMicrometricsTXT() {}

export const testables = {
  findDataBlocks: findDataBlocks,
};
