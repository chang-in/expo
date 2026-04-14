import { Button, Form, Host, Section, Spacer, TabView, Text, Toggle, VStack } from '@expo/ui/swift-ui';
import {
  animation,
  Animation,
  background,
  clipShape,
  font,
  foregroundStyle,
  frame,
  multilineTextAlignment,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import * as React from 'react';

// Example-screen choice — TabView itself imposes no height; we pin one so each
// section inside the parent Form has a predictable size.
const PAGE_HEIGHT = 500;

// Stand-in for `.infinity`. The frame modifier bridge interprets large finite
// values as fill-available-space; passing JS `Infinity` doesn't serialize.
const FILL_AVAILABLE = 10_000;

const PAGE_COLORS = [
  '#6200EE',
  '#03DAC5',
  '#FF5722',
  '#4CAF50',
  '#2196F3',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
];

const tabViewFrame = frame({ minHeight: PAGE_HEIGHT, maxHeight: PAGE_HEIGHT });
const fillFrame = frame({ maxWidth: FILL_AVAILABLE, maxHeight: FILL_AVAILABLE });

// VStack stacks top-down by default; bookending the content with Spacers
// vertically centers it within the fill frame. Same trick is used in
// OnboardingPage below.
function ColorPage({ index, label }: { index: number; label?: string }) {
  const color = PAGE_COLORS[index % PAGE_COLORS.length];
  return (
    <VStack
      alignment="center"
      spacing={0}
      modifiers={[fillFrame, background(color), clipShape('roundedRectangle', 12)]}>
      <Spacer />
      <Text modifiers={[font({ size: 22, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>
        {label ?? `Page ${index + 1}`}
      </Text>
      <Spacer />
    </VStack>
  );
}

function OnboardingPage({
  title,
  description,
  emoji,
  color,
}: {
  title: string;
  description: string;
  emoji: string;
  color: string;
}) {
  return (
    <VStack
      alignment="center"
      spacing={8}
      modifiers={[
        fillFrame,
        padding({ horizontal: 24 }),
        background(color),
        clipShape('roundedRectangle', 12),
      ]}>
      <Spacer />
      <Text modifiers={[font({ size: 48 })]}>{emoji}</Text>
      <Text modifiers={[font({ size: 22, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>
        {title}
      </Text>
      <Text
        modifiers={[
          font({ size: 14 }),
          foregroundStyle('#FFFFFFCC'),
          multilineTextAlignment('center'),
        ]}>
        {description}
      </Text>
      <Spacer />
    </VStack>
  );
}

export default function TabViewScreen() {
  // 1. uncontrolled
  const [uncontrolledPage, setUncontrolledPage] = React.useState(1);

  // 2. controlled
  const [sel1, setSel1] = React.useState(0);

  // 2. programmatic navigation
  const NAV_COUNT = 5;
  const [sel2, setSel2] = React.useState(0);

  // dots toggle
  const [showDots, setShowDots] = React.useState(true);
  const dotMode = showDots ? 'always' : ('never' as const);

  // 5. dynamic pages
  const [pageCount, setPageCount] = React.useState(3);
  const [sel5, setSel5] = React.useState(0);

  // 6. onboarding
  const [sel6, setSel6] = React.useState(0);

  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <Section title="Indicator dots">
          <Toggle isOn={showDots} onIsOnChange={setShowDots} label="Show dots on all pagers" />
        </Section>

        <Section title="Uncontrolled">
          <Text>No selection prop — native owns the state. Starts at the second page via initialSelection.</Text>
          <Text>Last reported page: {uncontrolledPage + 1}</Text>
          <TabView
            initialSelection={1}
            onSelectionChange={setUncontrolledPage}
            indexDisplayMode={dotMode}
            modifiers={[tabViewFrame]}>
            <ColorPage index={0} />
            <ColorPage index={1} />
            <ColorPage index={2} />
          </TabView>
        </Section>

        <Section title="Controlled">
          <Text>Current page: {sel1 + 1}</Text>
          <TabView selection={sel1} onSelectionChange={setSel1} indexDisplayMode={dotMode} modifiers={[tabViewFrame]}>
            <ColorPage index={0} />
            <ColorPage index={1} />
            <ColorPage index={2} />
          </TabView>
        </Section>

        <Section title="Programmatic navigation">
          <Text>
            Page {sel2 + 1} / {NAV_COUNT}
          </Text>
          <TabView selection={sel2} onSelectionChange={setSel2} indexDisplayMode={dotMode} modifiers={[tabViewFrame, animation(Animation.default, sel2)]}>
            {Array.from({ length: NAV_COUNT }).map((_, i) => (
              <ColorPage key={i} index={i} />
            ))}
          </TabView>
          <Button onPress={() => setSel2(0)} label="First" />
          <Button onPress={() => setSel2(Math.max(0, sel2 - 1))} label="Prev" />
          <Button onPress={() => setSel2(Math.min(NAV_COUNT - 1, sel2 + 1))} label="Next" />
          <Button onPress={() => setSel2(NAV_COUNT - 1)} label="Last" />
        </Section>

        <Section title="Dynamic pages">
          <Text>
            {pageCount} page{pageCount === 1 ? '' : 's'} — current {sel5 + 1}
          </Text>
          <TabView
            selection={Math.min(sel5, pageCount - 1)}
            onSelectionChange={setSel5}
            indexDisplayMode={dotMode}
            modifiers={[tabViewFrame]}>
            {Array.from({ length: pageCount }).map((_, i) => (
              <ColorPage key={i} index={i} />
            ))}
          </TabView>
          <Button onPress={() => setPageCount((c) => c + 1)} label="Add page" />
          <Button onPress={() => setPageCount((c) => Math.max(1, c - 1))} label="Remove page" />
        </Section>

        <Section title="Onboarding flow">
          <TabView
            selection={sel6}
            onSelectionChange={setSel6}
            indexDisplayMode={dotMode}
            modifiers={[tabViewFrame]}>
            <OnboardingPage
              title="Welcome"
              description="Meet the new pager powered by SwiftUI TabView."
              emoji="👋"
              color="#6200EE"
            />
            <OnboardingPage
              title="Swipe through"
              description="Native paging with the iOS page-style TabView."
              emoji="👉"
              color="#03A9F4"
            />
            <OnboardingPage
              title="You're set"
              description="Integrate it in your app in just a few lines of code."
              emoji="✅"
              color="#4CAF50"
            />
          </TabView>
        </Section>
      </Form>
    </Host>
  );
}

TabViewScreen.navigationOptions = {
  title: 'TabView',
};
