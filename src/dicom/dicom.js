import * as dicomParser from 'dicom-parser';

// const diagnosticReport_template = {
//   "resourceType" : "DiagnosticReport",
//   // from Resource: id, meta, implicitRules, and language
//   // from DomainResource: text, contained, extension, and modifierExtension
//   "identifier" : [{ Identifier }], // Business identifier for report
//   "basedOn" : [{ Reference(CarePlan|ImmunizationRecommendation|
//    MedicationRequest|NutritionOrder|ProcedureRequest|ReferralRequest) }], // What was requested
//   "status" : "<code>", // R!  registered | partial | preliminary | final +
//   "category" : { CodeableConcept }, // Service category
//   "code" : { CodeableConcept }, // R!  Name/Code for this diagnostic report
//   "subject" : { Reference(Patient|Group|Device|Location) }, // The subject of the report - usually, but not always, the patient
//   "context" : { Reference(Encounter|EpisodeOfCare) }, // Health care event when test ordered
//   // effective[x]: Clinically relevant time/time-period for report. One of these 2:
//   "effectiveDateTime" : "<dateTime>",
//   "effectivePeriod" : { Period },
//   "issued" : "<instant>", // DateTime this version was released
//   "performer" : [{ // Participants in producing the report
//     "role" : { CodeableConcept }, // Type of performer
//     "actor" : { Reference(Practitioner|Organization) } // R!  Practitioner or Organization  participant
//   }],
//   "specimen" : [{ Reference(Specimen) }], // Specimens this report is based on
//   "result" : [{ Reference(Observation) }], // Observations - simple, or complex nested groups
//   "imagingStudy" : [{ Reference(ImagingStudy|ImagingManifest) }], // Reference to full details of imaging associated with the diagnostic report
//   "image" : [{ // Key images associated with this report
//     "comment" : "<string>", // Comment about the image (e.g. explanation)
//     "link" : { Reference(Media) } // R!  Reference to the image source
//   }],
//   "conclusion" : "<string>", // Clinical Interpretation of test results
//   "codedDiagnosis" : [{ CodeableConcept }], // Codes for the conclusion
//   "presentedForm" : [{ Attachment }] // Entire report as issued
// }

// const media_template = {
//   "resourceType" : "Media",
//   // from Resource: id, meta, implicitRules, and language
//   // from DomainResource: text, contained, extension, and modifierExtension
//   "identifier" : [{ Identifier }], // Identifier(s) for the image
//   "basedOn" : [{ Reference(ProcedureRequest) }], // Procedure that caused this media to be created
//   "type" : "<code>", // R!  photo | video | audio
//   "subtype" : { CodeableConcept }, // The type of acquisition equipment/process
//   "view" : { CodeableConcept }, // Imaging view, e.g. Lateral or Antero-posterior
//   "subject" : { Reference(Patient|Practitioner|Group|Device|Specimen) }, // Who/What this Media is a record of
//   "context" : { Reference(Encounter|EpisodeOfCare) }, // Encounter / Episode associated with media
//   // occurrence[x]: When Media was collected. One of these 2:
//   "occurrenceDateTime" : "<dateTime>",
//   "occurrencePeriod" : { Period },
//   "operator" : { Reference(Practitioner) }, // The person who generated the image
//   "reasonCode" : [{ CodeableConcept }], // Why was event performed?
//   "bodySite" : { CodeableConcept }, // Body part in media
//   "device" : { Reference(Device|DeviceMetric) }, // Observing Device
//   "height" : "<positiveInt>", // C? Height of the image in pixels (photo/video)
//   "width" : "<positiveInt>", // C? Width of the image in pixels (photo/video)
//   "frames" : "<positiveInt>", // C? Number of frames if > 1 (photo)
//   "duration" : "<unsignedInt>", // C? Length in seconds (audio / video)
//   "content" : { Attachment }, // R!  Actual Media - reference or data
//   "note" : [{ Annotation }] // Comments made about the media
// }

const media = {
  "resourceType":"Media",
  "type": { "value": 1 }, // ()
  "content": {
    "data": { "value": "" }, // (7fe0,0010)
  }
};

let pixelData = null;

const createMedia = (uint8array) => {
  let dataSet = dicomParser.parseDicom(uint8array);
  let pixelDataElement = dataSet.elements.x7fe00010;
  if (pixelDataElement) {
    pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
  }
  if (pixelData) {
    media.content.data.value = Buffer.from(pixelData).toString('base64');
  }

  return media;
};

export default {
  createMedia
};
