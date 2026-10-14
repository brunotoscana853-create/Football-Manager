/* Legado de Treinador - validador de dados locais */
(function () {
  "use strict";

  const REQUIRED_ARRAYS = [
    "countries",
    "competitions",
    "clubs",
    "players",
    "staff",
    "fixtures"
  ];

  function validateData(data) {
    const errors = [];

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return {
        ok: false,
        errors: ["O arquivo precisa conter um objeto JSON."]
      };
    }

    if (data.schemaVersion !== 1) {
      errors.push("Versao do esquema invalida.");
    }

    if (data.game !== "Legado de Treinador") {
      errors.push("Nome do jogo inesperado.");
    }

    if (String(data.season) !== "2026") {
      errors.push("A temporada deve ser 2026.");
    }

    REQUIRED_ARRAYS.forEach(function (key) {
      if (!Array.isArray(data[key])) {
        errors.push(key + " precisa ser uma lista.");
      }
    });

    return {
      ok: errors.length === 0,
      errors: errors
    };
  }

  window.LegadoData = {
    validate: validateData,
    requiredArrays: REQUIRED_ARRAYS.slice()
  };
})();
