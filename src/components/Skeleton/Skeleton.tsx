import S from './Skeleton.module.css';

interface SkeletonProps {
  row: 1 | 2;
  col: 2 | 5 | 6;
}

function Skeleton({ row, col }: SkeletonProps) {
  const gridName = `gridName${row}${col}`;

  return (
    <div className={`${S[`${gridName}`]}`}>
      {new Array(row * col).fill(' ').map((_item, idx) => {
        return (
          <div key={idx} className={S.skeletonContainer}>
            <div className={S.skeletonImg} />
            <div className={S.skeletonInfoContainer}>
              <div className={S.skeletonTitle} />
              <div className={S.skeletonTagContainer}>
                <div className={S.skeletonTag} />
                <div className={S.skeletonTag} />
                <div className={S.skeletonTag} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Skeleton;
