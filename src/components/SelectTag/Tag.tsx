import S from './SelectTag.module.css';

type TagProps = React.ComponentProps<'button'> & {
  name: string;
};

function Tag({ name, ...restProps }: TagProps) {
  return (
    <button className={S.tagItem} {...restProps}>
      #{name}
    </button>
  );
}

export default Tag;
