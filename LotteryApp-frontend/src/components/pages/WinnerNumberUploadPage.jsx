import WinnerNumberUpload from '../common/WinnerNumberUpload';

const WinnerNumberUploadPage = () => {
  // Always allow upload for now
  return (
    <div className="max-w-xl mx-auto mt-10 rounded-2xl ">
      <WinnerNumberUpload isAdmin={true} />
    </div>
  );
};

export default WinnerNumberUploadPage;
