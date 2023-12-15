import { PERSON_ID, PERSON_TOKEN, DOMAIN } from "./config";
import { TObject, TResult, TResultUpload } from "./types";

const generateRandomVoucher = () => {
  const random = Math.floor(Math.random() * 10000000);
  return "B001-" + random.toString().padStart(8, "0");
};

const generateSaleTicket = (voucher: string) => {
  return {
    personaId: PERSON_ID,
    personaToken: PERSON_TOKEN,
    fileName: `20000000001-03-${voucher}`,
    production: false,
    documentBody: {
      "cbc:UBLVersionID": {
        _text: "2.1",
      },
      "cbc:CustomizationID": {
        _text: "2.0",
      },
      "cbc:ID": {
        _text: voucher,
      },
      "cbc:IssueDate": {
        _text: "2023-12-15",
      },
      "cbc:IssueTime": {
        _text: "10:52:30",
      },
      "cbc:InvoiceTypeCode": {
        _attributes: {
          listID: "0101",
        },
        _text: "03",
      },
      "cbc:Note": [
        {
          _text: "CIENTO DIECIOCHO CON 00/100 SOLES",
          _attributes: {
            languageLocaleID: "1000",
          },
        },
      ],
      "cbc:DocumentCurrencyCode": {
        _text: "PEN",
      },
      "cac:AccountingSupplierParty": {
        "cac:Party": {
          "cac:PartyIdentification": {
            "cbc:ID": {
              _attributes: {
                schemeID: "6",
              },
              _text: "20000000001",
            },
          },
          "cac:PartyName": {
            "cbc:Name": {
              _text: "Empresa de Prueba Comercial",
            },
          },
          "cac:PartyLegalEntity": {
            "cbc:RegistrationName": {
              _text: "Empresa Prueba",
            },
            "cac:RegistrationAddress": {
              "cbc:AddressTypeCode": {
                _text: "0000",
              },
              "cac:AddressLine": {
                "cbc:Line": {
                  _text:
                    "VIA TIPO_VIA NRO. 1000 ZONA TIPO_ZONA DPTO. DEPARTAMENTO SAN MARTIN DE PORRES LIMA LIMA",
                },
              },
            },
          },
        },
      },
      "cac:AccountingCustomerParty": {
        "cac:Party": {
          "cac:PartyIdentification": {
            "cbc:ID": {
              _attributes: {
                schemeID: "1",
              },
              _text: "75696618",
            },
          },
          "cac:PartyLegalEntity": {
            "cbc:RegistrationName": {
              _text: "DARWIN STALIN VILCACHAGUA AYALA",
            },
            "cac:RegistrationAddress": {
              "cac:AddressLine": {
                "cbc:Line": {
                  _text:
                    "ENRIQUE OCHOA CTE 19 MZ. 133 LT. 17 LOS OLIVOS LIMA LIMA",
                },
              },
            },
          },
        },
      },
      "cac:TaxTotal": {
        "cbc:TaxAmount": {
          _attributes: {
            currencyID: "PEN",
          },
          _text: 18,
        },
        "cac:TaxSubtotal": [
          {
            "cbc:TaxableAmount": {
              _attributes: {
                currencyID: "PEN",
              },
              _text: 100,
            },
            "cbc:TaxAmount": {
              _attributes: {
                currencyID: "PEN",
              },
              _text: 18,
            },
            "cac:TaxCategory": {
              "cac:TaxScheme": {
                "cbc:ID": {
                  _text: "1000",
                },
                "cbc:Name": {
                  _text: "IGV",
                },
                "cbc:TaxTypeCode": {
                  _text: "VAT",
                },
              },
            },
          },
        ],
      },
      "cac:LegalMonetaryTotal": {
        "cbc:LineExtensionAmount": {
          _attributes: {
            currencyID: "PEN",
          },
          _text: 100,
        },
        "cbc:TaxInclusiveAmount": {
          _attributes: {
            currencyID: "PEN",
          },
          _text: 118,
        },
        "cbc:PayableAmount": {
          _attributes: {
            currencyID: "PEN",
          },
          _text: 118,
        },
      },
      "cac:InvoiceLine": [
        {
          "cbc:ID": {
            _text: 1,
          },
          "cbc:InvoicedQuantity": {
            _attributes: {
              unitCode: "NIU",
            },
            _text: 1,
          },
          "cbc:LineExtensionAmount": {
            _attributes: {
              currencyID: "PEN",
            },
            _text: 100,
          },
          "cac:PricingReference": {
            "cac:AlternativeConditionPrice": {
              "cbc:PriceAmount": {
                _attributes: {
                  currencyID: "PEN",
                },
                _text: 118,
              },
              "cbc:PriceTypeCode": {
                _text: "01",
              },
            },
          },
          "cac:TaxTotal": {
            "cbc:TaxAmount": {
              _attributes: {
                currencyID: "PEN",
              },
              _text: 18,
            },
            "cac:TaxSubtotal": [
              {
                "cbc:TaxableAmount": {
                  _attributes: {
                    currencyID: "PEN",
                  },
                  _text: 100,
                },
                "cbc:TaxAmount": {
                  _attributes: {
                    currencyID: "PEN",
                  },
                  _text: 18,
                },
                "cac:TaxCategory": {
                  "cbc:Percent": {
                    _text: 18,
                  },
                  "cbc:TaxExemptionReasonCode": {
                    _text: "10",
                  },
                  "cac:TaxScheme": {
                    "cbc:ID": {
                      _text: "1000",
                    },
                    "cbc:Name": {
                      _text: "IGV",
                    },
                    "cbc:TaxTypeCode": {
                      _text: "VAT",
                    },
                  },
                },
              },
            ],
          },
          "cac:Item": {
            "cbc:Description": {
              _text: "producto 1",
            },
          },
          "cac:Price": {
            "cbc:PriceAmount": {
              _attributes: {
                currencyID: "PEN",
              },
              _text: 100,
            },
          },
        },
      ],
    },
  };
};

/**
 *
 * @param {*} saleTicket
 * @returns {Promise<{documentId: string, status: string, xml: string}>}
 */
const uploadSaleTicket = async (
  saleTicket: TObject
): Promise<TResultUpload> => {
  const result = await fetch(DOMAIN + "/personas/v1/sendBill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PERSON_TOKEN}`,
    },
    body: JSON.stringify(saleTicket),
  }).then((res) => res.json());
  return result;
};

/**
 * @param {number} documentId
 * @returns {Promise<boolean>}
 */
const verifyResponseSaleTicket = async (
  documentId: string
): Promise<[true, TResult] | [false, any]> => {
  const url = DOMAIN + "/documents/" + documentId + "/getById";
  try {
    const result = await fetch(url).then((r) => r.json());
    switch (result.status) {
      case "ACEPTADO":
        return [true, result];
      case "PENDIENTE":
        return await verifyResponseSaleTicket(documentId);
      case "EXCEPCION":
      case "RECHAZADO":
      default:
        return [false, result];
    }
  } catch (error) {
    return [false, error];
  }
};

export const processVoucher = async () => {
  const voucher = generateRandomVoucher();
  const saleTicket = generateSaleTicket(voucher);
  const resultUpload = await uploadSaleTicket(saleTicket);
  const resultSaleTicket = await verifyResponseSaleTicket(
    resultUpload.documentId
  );
  return resultSaleTicket;
};
