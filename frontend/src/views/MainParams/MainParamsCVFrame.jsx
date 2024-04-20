import MainParamsForm, { getParamValue } from "../../components/forms/MainParamsForm"
import { useSimpleUI } from "../../context/context"


export default function MainParamsCVOperation({ data }) {
  const { updateCurrentContent, updateConfigItem } = useSimpleUI()
  const fields = [
    { name: 'Name', type: 'text', title: 'Name' },
    { name: 'CVOnline', type: 'checkbox', title: 'Online mode'},
    { name: 'CVDetector', type: 'select', title: 'Detector', options: {
      Barcode: 'Barcodes',
      OCR: 'Optical text recognition (OCR)',
      Objects_Full: 'OСR and barcodes',
      Objects_OCR: 'Material objects with OCR',
      Objects_Barcode: 'Material objects with barcode',
      Objects_f1: 'Face detections',
      multiscanner: 'Multiscanner',
      featurescanner: 'Featurescanner',
      object_opencv: 'OpenCV-Object',
      face_opencv: 'OpenCV-Face',
    }},
    { name: 'CVDetectorMode', type: 'select', title: 'Detector mode', options: {
      train: 'Training',
      predict: 'Prediction',
    }},
    { name: 'CVResolution', type: 'select', title: 'Resolution', options: {
      HD1080: 'HD1080',
      HD720: 'HD720',
      VGA: 'VGA',
      QVGA: 'QVGA',
    }},
    { name: 'CVCameraDevice', type: 'select', title: 'Camera mode', options: {
      Back: 'Rear',
      Front: 'Front',
    }},
    { name: 'CVMode', type: 'select', title: 'Mode', options: {
      list_only: 'Show objects only in lists',
      green_and_grey: 'Show only green, the rest is gray',
      green_and_red: 'Show only green, the rest is red',
      list_and_grey: 'Show objects only in lists. The rest are grey',
    }},
    { name: 'CVAction', type: 'text', title: 'Action' },
    { name: 'CVActionButtons', type: 'text', title: 'Action buttons' },
    { name: 'CVInfo', type: 'text', title: 'Info', required: false },
    { name: 'CVMask', type: 'text', title: 'Mask', required: false },
  ]

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newContent = Object.fromEntries(fields.map(el => {
      return [el.name, getParamValue(form[el.name])]
    }))
    updateCurrentContent({ ...data, ...newContent })
  }
  return (
    <MainParamsForm data={data} fields={fields} onSubmit={handleSubmit} title={`Frame: ${data.Name}`}></MainParamsForm>
  )
}