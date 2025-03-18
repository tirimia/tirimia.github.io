import { useState } from "react"
import type { Reading } from "./reading"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import { ReadingDocument } from "./document"

type RDProps = {
    reading: Reading,
    onBack: () => void
}

export default function ReadingDisplay(props: RDProps) {
    const [reading, setReading] = useState(props.reading)

    const exportReading = () => {
        const dataStr = JSON.stringify(reading, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileName = `tarot-reading-${reading.querent.toLowerCase().replace(/\s+/g, '-')}-${new Date().getTime()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileName);
        linkElement.click();
  };
    return (<div>

       <h2>Tarot Reading: {reading.reason}</h2>
       <p>For: {reading.querent} | Spread: {reading.spread}</p>


           {import.meta.env.DEV &&
               (
                   <div>
                       <h3>Preview</h3>
                       <PDFViewer >
                           <ReadingDocument {...reading}/>
                       </PDFViewer>
                   </div>
               )
           }
         <div>
           <PDFDownloadLink
             document={<ReadingDocument {...reading} />}
             fileName={`tarot-reading-${reading.querent.toLowerCase().replace(/\s+/g, '-')}.pdf`}
           >
             {({ blob, url, loading, error }) =>
               loading ? 'Preparing PDF...' : 'Download Reading as PDF'
             }
           </PDFDownloadLink>
         </div>
         <button onClick={exportReading}>Export reading as JSON</button>
            </div>
         )
}
