import { Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Button,
  ButtonVariant,
  ButtonWidth,
  Checkbox,
  Chips,
  Flex,
  headers,
  IconButton,
  IconButtonVariant,
  Input,
  PlusFilledIcon,
  Sheet,
  Stack,
  text,
  XIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiSkill, ApiSkills } from 'store/_types/ApiSkills';
import { ApiStats } from 'store/_types/ApiStats';
import { getAbilityModifier } from 'utils/getAbilityModifier';
import { getProficiencyBonusByCR } from 'utils/getProficiencyBonusByCR';

interface AddSkillsProps {
  skills: ApiSkills;

  stats: ApiStats;

  challenge_rating: string;

  handleFieldChange: (value: unknown, name: string) => void;
}

const ruNameBykey: Record<string, string> = {
  strength: 'Сила',
  dexterity: 'Ловкость',
  intelligence: 'Интеллект',
  wisdom: 'Мудрость',
  charisma: 'Харизма'
};

export const AddSkills = ({ skills, stats, challenge_rating, handleFieldChange }: AddSkillsProps) => {
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(skills);

  const handleSave = () => {
    handleFieldChange(temp, 'skills');
    setOpen(false);
  };

  const handleReset = () => {
    setTemp(skills);
  };

  const handleRemove = (groupKey: keyof ApiSkills, skillKey: string, skill: ApiSkill) => {
    const updatedSkills = {
      ...skills,
      [groupKey]: {
        ...skills[groupKey],
        [skillKey]: {
          ...skill,
          mastery: false
        }
      }
    };

    handleFieldChange(updatedSkills, 'skills');
  };

  const getModifier = (groupKey: keyof ApiStats, skill: ApiSkill) => {
    const value = stats[groupKey].value;
    if (!value || value.toString() === '') return '-';

    const _value = value > 30 ? 30 : value < 1 ? 1 : value;
    const mod = getAbilityModifier(_value) + (skill.mastery ? getProficiencyBonusByCR(challenge_rating) : 0);

    return `${mod > 0 ? '+' : ''}${mod.toString()}`;
  };

  const masteredSkillNodes: React.ReactNode[] = Object.entries(skills).flatMap(([key, skillGroup]) =>
    Object.entries(skillGroup as Record<string, ApiSkill>)
      .filter(([, skill]) => skill.mastery)
      .map(([skillKey, skill]) => (
        <Chips
          onRemove={() => {
            handleRemove(key as keyof ApiSkills, skillKey, skill);
          }}
          withRemoveButton
          style={text.defaultMedium}
          value={skill.name}
          key={skillKey}>
          {skill.name} <div {...stylex.props(styles.mod)}>{getModifier(key as keyof ApiStats, skill)}</div>
        </Chips>
      ))
  );

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (open) setTemp(skills);
        setOpen(open);
      }}>
      <Stack gap={12}>
        <Input.Wrapper label="Навыки">
          <Sheet.Trigger asChild>
            <Button type="button">
              Выбрать навыки <PlusFilledIcon {...stylex.props(styles.icon)} />
            </Button>
          </Sheet.Trigger>
        </Input.Wrapper>

        {!!masteredSkillNodes.length && (
          <Flex gap={8} rowGap={8}>
            {masteredSkillNodes}
          </Flex>
        )}

        {Object.keys(temp).map((t) => (
          <Fragment key={t}>
            {Object.entries(temp[t as keyof ApiSkills]).map(([skillKey, skillValue]) => (
              <input
                type="hidden"
                key={skillValue.name}
                value={String(skillValue.mastery)}
                name={`${skillKey}_mastery`}
              />
            ))}
          </Fragment>
        ))}
      </Stack>

      <Sheet.Content style={styles.root}>
        <Sheet.Header>
          <h3 {...stylex.props(headers.h3Semibold, styles.title)}>Навыки</h3>
          <Sheet.Close asChild>
            <IconButton size="sm" variant={IconButtonVariant.ghost}>
              <XIcon />
            </IconButton>
          </Sheet.Close>
        </Sheet.Header>

        <Stack style={styles.body} gap={24}>
          {Object.keys(temp).map((t) => (
            <Stack gap={12} key={t}>
              <div {...stylex.props(text.defaultSemibold)}>
                {ruNameBykey[t]} ({t[0].toUpperCase() + t.slice(1)})
              </div>
              {Object.entries(temp[t as keyof ApiSkills]).map(([skillKey, skillValue]) => (
                <Flex key={skillValue.name} gap={8}>
                  <Checkbox
                    onCheckedChange={(e) => {
                      setTemp((prev) => ({
                        ...prev,
                        [t as keyof ApiSkills]: {
                          ...prev[t as keyof ApiSkills],
                          [skillKey]: {
                            ...skillValue,
                            mastery: e
                          }
                        }
                      }));
                    }}
                    checked={skillValue.mastery}
                    style={styles.checkbox}
                  />
                  <div aria-selected={skillValue.mastery} {...stylex.props(text.defaultMedium, styles.label)}>
                    {skillValue.name} ({skillKey[0].toUpperCase() + skillKey.slice(1).replaceAll('_', ' ')})
                  </div>
                  <div aria-selected={skillValue.mastery} {...stylex.props(text.defaultMedium, styles.value)}>
                    {getModifier(t as keyof ApiSkills, skillValue)}
                  </div>
                </Flex>
              ))}
            </Stack>
          ))}
        </Stack>

        <Sheet.Footer style={styles.footer}>
          <Button onClick={handleSave} width={ButtonWidth.full}>
            Сохранить
          </Button>
          <Button onClick={handleReset} width={ButtonWidth.full} variant={ButtonVariant.ghost}>
            Сбросить изменения
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault,
    height: '100%',
    overflowY: 'scroll',
    scrollbarGutter: 'stable',
    '::-webkit-scrollbar': {
      background: 'transparent',
      display: 'none',
      height: 0,
      width: 0
    }
  },
  mod: {
    color: colors.brand80,
    textDecoration: 'underline'
  },
  title: {
    flex: '1'
  },
  body: {
    flex: '1',
    padding: '0 24px '
  },
  icon: {
    height: 16,
    width: 16
  },
  label: {
    backgroundColor: { default: 'transparent', ':is([aria-selected=true])': 'transparent' },
    color: { default: colors.textSecondaryDefault, ':is([aria-selected=true])': colors.brand80 },
    transition: 'all 0.2s'
  },
  value: {
    backgroundColor: { default: 'transparent', ':is([aria-selected=true])': colors.orange10 },
    color: { default: colors.textPrimaryDefault, ':is([aria-selected=true])': colors.brand80 },
    transition: 'all 0.2s'
  },
  checkbox: {
    height: 24,
    width: 24
  },
  footer: {
    display: 'flex',
    gap: 8
  }
});
