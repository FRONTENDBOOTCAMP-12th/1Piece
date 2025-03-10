import { CiSearch } from 'react-icons/ci';
import S from '../Header.module.css';

function HeaderSearchBar() {
  // 이후 검색하게 될 경우 일어날 이벤트 구현해야 함
  const handleSearch = () => {
    console.log(123);
  };

  return (
    <form className={S.headerForm} action={handleSearch}>
      <label htmlFor="headerSearchBar" className="sr-only">
        검색
      </label>
      <input type="search" id="headerSearchBar" className={S.headerSearchBar} />
      {/* submit 타입으로 action을 트리거할 수 있다 */}
      <button type="submit" className={S.headerSearchBtn}>
        <CiSearch size={24} />
      </button>
    </form>
  );
}

export default HeaderSearchBar;
