import { Toaster } from 'react-hot-toast';
import EditProfileContainer from './components/EditProfileContainer';

function EditProfilePage() {
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <EditProfileContainer />
    </div>
  );
}

export default EditProfilePage;
