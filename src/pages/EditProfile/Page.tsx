import EditProfileContainer from './components/EditProfileContainer';
import { Toaster } from 'react-hot-toast';

function EditProfilePage() {
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <EditProfileContainer />
    </div>
  );
}

export default EditProfilePage;
