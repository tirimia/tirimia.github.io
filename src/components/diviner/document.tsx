import { Document, Page, Text, View } from '@react-pdf/renderer';

import { type Reading } from "./reading";
import { SpreadSteps, type SpreadStep } from "./spread";
import { TarotCardNames } from './card';


type StepPageProps = Reading['reading'][number] & {
    nth: number,
    spreadStep: SpreadStep,
}

function StepPage(props: StepPageProps) {
  return (
      <Page size="A4" wrap={false} key={props.nth} style={{ minHeight: '100vh', position: 'relative' }}>
      <Text>{props.spreadStep.name}</Text>
      <Text>{props.spreadStep.prompt}</Text>
      <Text>
        {TarotCardNames[props.card.cardCode]}
        {props.card.reversed ? " (Reversed)" : ""}
      </Text>
      <Text>{props.card.interpretation}</Text>

      {props.clarifiers && props.clarifiers.length > 0 && (
        <View>
          <Text>Clarifiers:</Text>
          {props.clarifiers.map((clarifier, idx) => (
            <View key={idx}>
              <Text>
                {TarotCardNames[clarifier.cardCode]}
                {clarifier.reversed ? " (Reversed)" : ""}
              </Text>
              <Text>{clarifier.interpretation}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  );
}

function CoverPage({reason, querent, spread}:{reason: string, querent: string, spread: string}) {
  return (
    <Page size="A4">
      <View>
        <Text>{reason}</Text>
        <Text>Tarot Reading for {querent}</Text>
        <Text>{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</Text>
        <Text>Spread: {spread}</Text>
      </View>
    </Page>
  );
}

export const ReadingDocument = (reading: Reading) => (
    <Document>
        <CoverPage reason={reading.reason} querent={reading.querent} spread={reading.spread}/>
        {reading.reading.map((step, idx) => (<StepPage nth={idx} spreadStep={SpreadSteps[reading.spread][idx]!} {...step} />))}
    </Document>
)
