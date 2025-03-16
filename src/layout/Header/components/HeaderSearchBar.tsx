import { CiSearch } from 'react-icons/ci';
import S from './HeaderSearchBar.module.css';
import { useNavigate } from 'react-router';

function HeaderSearchBar() {
  const navigation = useNavigate();

  // 이후 검색하게 될 경우 일어날 이벤트 구현해야 함
  const handleSearch = (formData: FormData) => {
    const keyword = JSON.stringify(formData.get('searchKeyword'));

    navigation(`/card-list/?search=${keyword}`);
  };

  return (
    <form className={S.headerForm} action={handleSearch}>
      <label htmlFor="headerSearchBar" className="sr-only">
        검색
      </label>
      <input
        type="search"
        id="headerSearchBar"
        className={S.headerSearchBar}
        name="searchKeyword"
      />
      {/* submit 타입으로 action을 트리거할 수 있다 */}
      <button type="submit" className={S.headerSearchBtn}>
        <CiSearch size={24} />
      </button>
    </form>
  );
}

export default HeaderSearchBar;
