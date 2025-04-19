import { Fragment, RefObject, Suspense, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { createPortal } from 'react-dom';
import { Accordion, ChevronDownIcon, ChevronUpIcon, CopyIcon, Flex, RadioGroup, Spinner, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiTrait } from 'store/_types/ApiTrait';
import { TraitList } from '../TraitList';

interface GroupListProps {
  name: string;

  openedSections: string[];

  setOpenedSections: (sections: string[]) => void;

  value: Record<string, ApiTrait | undefined>;

  setValue: (actionObj: Record<string, ApiTrait>) => void;

  traitGroupOptions: {
    name: string;
    count: number;
  }[];
}

export const GroupList = ({ traitGroupOptions, openedSections, value, setValue, name }: GroupListProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      {traitGroupOptions.map((o) => (
        <Accordion.Item style={styles.item} value={o.name} key={o.name}>
          <Accordion.Control style={[styles.control, text.defaultSemibold]}>
            {(open: boolean) => (
              <Fragment>
                <Flex gap={8}>
                  {o.name}
                  <Flex gap={4} style={[text.smallMedium, styles.tagCount]}>
                    <CopyIcon {...stylex.props(styles.tagIcon)} /> {o.count}
                  </Flex>
                  <div ref={contentRef}></div>
                </Flex>
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Fragment>
            )}
          </Accordion.Control>

          <Accordion.Panel>
            <Suspense fallback={<FallbackLoader targetRef={contentRef} />}>
              <RadioGroup value={value[o.name]?.id.toString() ?? ''}>
                <TraitList name={name} setValue={setValue} opened={openedSections.includes(o.name)} groupId={o.name} />
              </RadioGroup>
            </Suspense>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Fragment>
  );
};

function FallbackLoader({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  if (!targetRef.current) return null;
  return <>{createPortal(<Spinner width={18} height={18} />, targetRef.current)}</>;
}

const styles = stylex.create({
  item: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10
  },
  control: {
    padding: 12
  },
  tagCount: {
    alignItems: 'center',
    backgroundColor: '#C5C5C5',
    borderRadius: 12,
    justifyContent: 'center',
    padding: '2px 6px'
  },
  tagIcon: {
    color: colors.textSecondaryDefault,
    height: 12,
    width: 12
  }
});
