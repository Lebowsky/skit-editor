import CommonParamsForm from "../../components/forms/CommonParamsForm"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"


export default function CommonParamsCVFrame() {
  const { currentContent, updateContent } = useSimpleUI() as IContextProviderData
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

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      Name: {value: string}
      CVOnline: {checked: boolean}
      CVDetector: {value: string}
      CVDetectorMode: {value: string}
      CVResolution: {value: string}
      CVCameraDevice: {value: string}
      CVMode: {value: string}
      CVAction: {value: string}
      CVActionButtons: {value: string}
      CVInfo: {value: string}
      CVMask: {value: string}
    }
    const newContent = {
      Name: target.Name.value,
      CVOnline: target.CVOnline.checked,
      CVDetector: target.CVDetector.value,
      CVDetectorMode: target.CVDetectorMode.value,
      CVResolution: target.CVResolution.value,
      CVCameraDevice: target.CVCameraDevice.value,
      CVMode: target.CVCameraDevice.value,
      CVAction: target.CVAction.value,
      CVActionButtons: target.CVActionButtons.value,
      CVInfo: target.CVInfo.value,
      CVMask: target.CVMask.value,
    }
    currentContent && updateContent({...currentContent, content: {...currentContent.content, ...newContent}})
  }
  return (
    currentContent && 
    <CommonParamsForm 
      fields={fields} 
      onSubmit={handleSubmit} 
      title={`Frame: ${currentContent.content.Name}`}/>
  )
}