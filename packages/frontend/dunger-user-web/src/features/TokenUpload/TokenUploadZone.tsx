import { Fragment, useEffect, useId, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Flex, PaperclipIcon, Spinner, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { useTokenUpload } from './useTokenUpload';

export interface TokenUploadZoneProps {
  setObjectKey: (objectKey: string | null) => void;
  initialUrl?: string | null;
  objectKey?: string | null;
  caption?: string;
  title?: string;
  validTypes?: string[];
  maxSize?: number;
  invalid?: boolean;
  shouldResetError?: boolean;
}

export function TokenUploadZone({
  invalid,
  setObjectKey,
  initialUrl,
  objectKey,
  caption = 'Картинка формата .jpeg, .png до 2 МБ',
  title = 'Нажмите, чтобы загрузить токен',
  validTypes = ['image/svg+xml', 'image/png', 'image/jpeg'],
  maxSize = 2 * 1024 * 1024,
  shouldResetError
}: TokenUploadZoneProps) {
  const id = useId();

  const { handleTokenChange, removeToken, handleDrop, handleDrag, error, loading, preview, setError } = useTokenUpload({
    initialUrl,
    validTypes,
    maxSize,
    setObjectKey
  });

  useEffect(() => {
    if (shouldResetError) {
      setError(null);
    }
  }, [shouldResetError, setError]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (objectKey === null && inputRef.current) {
      inputRef.current.value = '';
      removeToken();
    }
  }, [objectKey, removeToken]);

  return (
    <Fragment>
      <div>
        <label
          htmlFor={id}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDrop={(e) => {
            if (loading) return;
            inputRef.current?.dispatchEvent(new Event('change', { bubbles: true }));
            handleDrop(e);
          }}
          {...stylex.props(styles.root, invalid && styles.invalid)}>
          {loading && (
            <div {...stylex.props(styles.spinner)}>
              <Spinner width={40} height={40} />
            </div>
          )}

          {preview ? (
            <Flex gap={16} align="center">
              <div {...stylex.props(styles.imgRemove)}>
                <img src={preview} alt={''} {...stylex.props(styles.preview)} />
              </div>
              <Stack align="center" gap={4}>
                <h4 {...stylex.props(text.smallSemibold, styles.title)}>Нажмите, чтобы изменить токен</h4>
                <p {...stylex.props(text.smallMedium, styles.caption)}>{caption}</p>
              </Stack>
            </Flex>
          ) : (
            <Stack align="center" gap={16}>
              <div {...stylex.props(styles.icon)}>
                <PaperclipIcon width={16} height={16} />
              </div>
              <Stack align="center" gap={4}>
                <h4 {...stylex.props(text.defaultSemibold, styles.title)}>{title}</h4>
                <p {...stylex.props(text.smallMedium, styles.caption)}>{caption}</p>
              </Stack>
            </Stack>
          )}
        </label>
        {error && <div {...stylex.props(text.smallMedium, styles.error)}>{error}</div>}
      </div>
      <input
        type={'file'}
        ref={inputRef}
        disabled={loading}
        id={id}
        name={id}
        accept={validTypes.join(',')}
        onChange={(e) => {
          if (e.isTrusted) handleTokenChange(e);
        }}
        {...stylex.props(styles.input)}
      />
    </Fragment>
  );
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.backgroundUniversal,
    borderColor: { default: 'transparent', ':hover': colors.brand70 },
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: '1px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: 166,
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.2s',
    width: '100%'
  },
  spinner: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 20
  },
  preview: {
    borderRadius: '50%',
    height: 80,
    objectFit: 'cover',
    width: 80
  },
  title: {
    color: colors.textPrimaryDefault
  },
  caption: {
    color: colors.textTertiaryDefault
  },
  imgRemove: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 80,
    justifyContent: 'center',
    position: 'relative',
    width: 80
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.orange10,
    borderRadius: '50%',
    color: colors.brand80,
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    width: 'fit-content'
  },
  input: {
    display: 'none'
  },
  invalid: {
    borderColor: colors.buttonAccentDefault
  },
  error: {
    color: colors.textErrorDefault
  }
});
