'use client';
import Image from 'next/image';
import TwitterLogoImage from '../../public/twitter.png';
import Modal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useAuthState } from '@/utils/contexts/AuthContexts';
import { CloseOutlined } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import BackgroundPromo from '@/components/UI/Promos/BackgroundPromo';
import UploadIconImage from '../../../public/upload.png';
import NFTCard from '@/components/UI/Cards/NFTCard';
import axios from 'axios';
import { env } from 'process';
import { fetchAllNFT } from '@/utils/apis/nft';
import AWS from 'aws-sdk';
import lighthouse from '@lighthouse-web3/sdk';

export default function Mint() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isViewNFTModalOpen, setIsViewNFTModalOpen] = useState(false);
  const [isFetchNFTLoading, setIsFetchNFTLoading] = useState(false);
  const [myNFTsList, setMyNFTsList] = useState([]);
  const [userText, setUserText] = useState('Connect Wallet');
  const [userId, setUserId] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [page, setPage] = useState(1);

  const userLoggedIn = useAuthState();

  //const { state, dispatch } = useContext(StoreContext);

  const [file, setFile] = useState<File>();

  const [address, setAddress] = useState();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [fileurl, setFileurl] = useState('');

  const s3 = new AWS.S3();

  const S3_BUCKET = 'marketplace-images-bucket';
  const REGION = 'ap-south-1';

  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
  });

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '1rem',
    borderColor: '#848484',
    backgroundColor: '#000000',
    color: '#434343',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
  };

  const focusedStyle = {
    borderColor: '#64B3AE',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      setFileurl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const fetchData = async () => {
    const data = await fetchAllNFT({ page, limit: 8 });
    setMyNFTsList(data);
    return data;
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setTransactionHash('');
  };

  const openViewNFTModal = () => {
    setIsViewNFTModalOpen(true);
    fetchData();
  };

  const closeViewNFTModal = () => {
    setIsViewNFTModalOpen(false);
  };

  const shareOnTwitter = () => {
    window
      .open(
        'https://twitter.com/intent/tweet?text=Minted%20a%20brand%20new%20NFT%20on%20@0xMantle%20%20NFT%20Minter%20powered%20by%20@hash_case%0a%0aMint%20yours%20at%20https%3A//www.hashcase.co/mantle/mint%0a@BitDAO_Official%20%23faucet%20%23BuildonMantle%20',
        '_blank'
      )
      ?.focus();
  };

  const lighthouseUpload = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;

    let imageURI1;
    let metadataURI1;

    await lighthouse
      .uploadBuffer(file, apiKey)
      .then(async (result) => {
        imageURI1 = `https://gateway.lighthouse.storage/ipfs/${result.data.Hash}`;

        const metadata = JSON.stringify({
          name,
          description,
          image: `https://gateway.lighthouse.storage/ipfs/${result.data.Hash}`,
        });

        await lighthouse
          .uploadText(metadata, apiKey, `${name}-mpnew-metadata`)
          .then(async (jsonResult) => {
            metadataURI1 = `https://gateway.lighthouse.storage/ipfs/${jsonResult.data.Hash}`;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    const obj = { imguri: imageURI1, mdturi: metadataURI1 };

    return obj;
  };

  const handleMintNFT = async () => {
    if (isMinting) {
      return;
    }
    if (userText == 'NOT CONNECTED') {
      //notify("Connect your wallet first", "error");
      window.alert('Connect your wallet first');
      return;
    }
    if (
      name.trim() == '' ||
      description.trim() == '' ||
      //quantity == "" ||
      file == null
    ) {
      //notify("Fill all the details", "error");
      window.alert('Fill all the details');
      return;
    }
    if (Number(quantity) <= 0 || Number(quantity) > 1000) {
      //notify("You can mint between 1 and 1000 NFTs only", "error");
      window.alert('You can mint between 1 and 1000 NFTs only');
      return;
    }
    setIsMinting(true);
    try {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: `${Date.now()}.${file.name}`,
      };

      const { Location } = await s3.upload(params).promise();

      console.log('uploading to s3', Location);

      /* let data = new FormData();
     data.append("name", name);
     data.append("description", description);
     data.append("user_id",userId);
     data.append("file",file);
     
     //data.append("image", image);
     console.log("state.user.wallet_address:"+state.user.wallet_address);
     data.append("wallet_address", state.user.wallet_address);
     data.append("amount", quantity);
     //data.append("quantity", quantity);
     //data.append("image",Location);
     data.append("image_url",Location);

    // await handleUpload(file); */

      const obj = await lighthouseUpload(file);

      const data = {
        name: name,
        metadataURI: obj.mdturi,
        user_wallet_address: userLoggedIn.userDetails?.wallet_address,
        user_id: userLoggedIn.userDetails?.id,
        collection_address:
          process.env.NEXT_PUBLIC_MANTLE_NFT_CONTRACT_ADDRESS1,
        description: description,
        image: obj.imguri,
        image_preview: Location,
        quantity: quantity,
      };

      console.log(data);

      const res = await axios.post(
        //`${env.API}/mantle/mintNFT`, data
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/nft/mintNFT`,
        data
      );

      setTransactionHash(res.data.txn_hash);

      setName('');
      setDescription('');
      setQuantity(1);

      //setProgresspercent(0);
      setFile(undefined);
      setFileurl('');
      setImageURI('');
      setMetadataURI('');

      openSuccessModal();
      setIsMinting(false);
    } catch (err) {
      console.log(err);
      setIsMinting(false);
      //notify("Minting failed, try again later!", "error");
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '1rem',
      backgroundImage: 'linear-gradient(to bottom, #000000, #000000)',
    },
    overlay: {
      background: '#00000083',
      zIndex: 1000,
    },
  };

  const viewNFTModalStyles = {
    content: {
      width: '80%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '1rem',
      backgroundImage: 'linear-gradient(to bottom, #000000, #000000)',
    },
    overlay: {
      background: '#00000083',
      zIndex: 1000,
    },
  };

  const inputContainer =
    'bg-[#1E1E1E] p-4 rounded-2xl flex flex-col items-start mb-2 text-[#848484] outline-none	text-sm	';

  const inputGroupContainer = 'w-full flex flex-col mb-8 mt-4';

  const inputLabel = 'mb-6 text-xl flex';

  const inputLabelstar = 'ml-1 text-red-700';

  const inputFileContainer =
    'bg-black text-white/20 p-4 rounded-2xl border-[#848484] border-dashed border-2 flex flex-col justify-center items-center gap-4 outline-none mb-2';

  const user_address = userLoggedIn.userDetails?.wallet_address
    ? userLoggedIn.userDetails?.wallet_address
    : 'NOT CONNECTED';

  return (
    <div className="bg-black text-white">
      <BackgroundPromo
        title="Create"
        subtitle="Unlock your Digital Masterpieces with NFTs"
      />
      <div className="w-11/12 mx-8 my-auto pt-4 flex gap-10 ">
        <div className="w-80 mt-4 text-xl">
          <h1>Preview</h1>
          {/*   <div className="bg-[]" >
        
        <div className={Style.NFTCard_box_img}>
          {fileurl ? <Image src={fileurl} alt="uploaded" width={347}
            height={307}
            className={Style.NFTCard_box_img_img}/> : <div className={Style.NFTCard_box_img_img}>Image of the NFT</div>}
          
        </div>
        <div className={Style.NFTCard_box_nft_name}><p>{name}</p></div>
        <div className={Style.NFTCard_box_descr}>
        <div className={Style.NFTCard_creator_descr}>
         <div className={Style.NFTCard_box_avatar_img}>Owned By:</div>
        <div className={Style.NFTCard_box_avatar_name}>{userText != "NOT CONNECTED" ? <p>{userLoggedIn.userDetails?.wallet_address?.substring(0,6)}...{userLoggedIn.userDetails?.wallet_address?.substring(38)}</p> : <p>NOT CONNECTED</p>}</div>
        </div>

        <div className={Style.NFTCard_box_nft_price}><div className={Style.NFTCard_box_nft_price_top}>Price:</div>
      <div className={Style.NFTCard_box_nft_price_bottom}><Image
            src="/icons/mnt.png"
            alt="img"
            width={24}
            height={24}
            placeholder="blur"
            blurDataURL="/icons/mnt.png"
            priority
          />
      <p>0.00 MNT</p></div>
      </div>
        
        
       
        </div>
        
        
 </div>*/}
          <NFTCard
            nft={{
              image: fileurl,
              name: name,
              user_id: user_address,
            }}
          />
        </div>

        <Modal
          isOpen={isSuccessModalOpen}
          onRequestClose={closeSuccessModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="p-5 bg-black text-white">
            <span>NFT Minted Successfully!</span>
            <div className="pt-4 pb-4">
              <span>Transaction Hash:</span>
              <input className="ml-4" type={'text'} value={transactionHash} />
            </div>
            <div>
              <button
                className="m-1 p-2 border border-white"
                onClick={shareOnTwitter}
              >
                <span>Share on Twitter</span>
              </button>
              <button
                className="m-1 p-2 border border-white"
                onClick={() => {
                  closeSuccessModal();
                  openViewNFTModal();
                }}
              >
                View my NFTs
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isViewNFTModalOpen}
          onRequestClose={closeViewNFTModal}
          style={viewNFTModalStyles}
        >
          <div className="w-full p-1 h-4/5 flex items-center bg-black flex-col	">
            <div className="w-full flex justify-between">
              <div className="text-2xl text-white">My NFTs:</div>
              <CloseOutlined
                className="cursor-pointer"
                onClick={closeViewNFTModal}
              />
            </div>
            {isFetchNFTLoading ? (
              <div className="flex items-center justify-center flex-1">
                <BeatLoader size={20} color={'#000000'} />
              </div>
            ) : myNFTsList.length > 0 ? (
              <div className="w-full pt-4 flex-1 max-h-full	overflow-auto	flex flex-wrap	items-start">
                {myNFTsList.map((nft, i) => {
                  return (
                    <div
                      key={i}
                      className="w-64rounded-lg overflow-hidden	bg-[#1E1E1E] flex flex-col h-auto mr-4 mb-4"
                    >
                      <img className="w-64 h-64" src="XXXX" alt="XXXX" />
                      <div className="p-2 pb-0 text-xl font-semibold">
                        Name: XXXX
                      </div>

                      <div className="p-2 pt-0 whitespace-nowrap	overflow-hidden text-ellipsis	">
                        Quantity: XXXX
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                No NFT Found
              </div>
            )}
          </div>
        </Modal>
        <div className="w-full">
          <div className={inputGroupContainer}>
            <span className={inputLabel}>
              Title <h2 className={inputLabelstar}>*</h2>
            </span>
            <input
              className={inputContainer}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={'A really cool name'}
            />
          </div>
          <div className={inputGroupContainer}>
            <span className={inputLabel}>
              Quantity<h2 className={inputLabelstar}>*</h2>
            </span>
            <input
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
              className={inputContainer}
              type="number"
              placeholder={'How many do you want to mint?'}
            />
          </div>
          <div className={inputGroupContainer}>
            <span className={inputLabel}>
              Describe your NFT<h2 className={inputLabelstar}>*</h2>
            </span>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className={`${inputContainer} text-[#848484] h-16 resize-none`}
              placeholder={"e.g.'This is very limited item'"}
            ></textarea>
          </div>

          <div className={inputGroupContainer}>
            <span className={inputLabel}>
              Upload file<h2 className={inputLabelstar}>*</h2>
            </span>
            <div {...getRootProps({})} className={inputFileContainer}>
              <input {...getInputProps()} />
              <p>
                <Image
                  src={UploadIconImage}
                  alt="img"
                  width={33}
                  height={27}
                  placeholder="blur"
                  priority
                />
              </p>
              <p>
                {file != null
                  ? `${file.name.substring(
                      0,
                      Math.min(file.name.length, 15)
                    )}...`
                  : 'PNG, JPG, GIF, WEBP or MP4. Max 200mb.'}
              </p>
            </div>
          </div>

          <button
            className="py-3.5 px-11 border border-black border-solid rounded-3xl text-2xl text-black  bg-mgreen mt-8 mb-8"
            onClick={handleMintNFT}
          >
            {isMinting ? (
              <BeatLoader size={10} color={'#000000'} />
            ) : (
              'Mint NFT'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
