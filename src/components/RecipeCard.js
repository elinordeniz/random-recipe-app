import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../styles/RecipeCard.css";
import useRecipe from "../contexts/RecipeContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { TfiClose } from "react-icons/tfi";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const RecipeCard = () => {
  const {
    randomRecipe,
    isLoadingAllRecipes,
    errorAllRecipes,
    randomRecipeLoading,
    allRecipes
  } = useRecipe();
  const navigate = useNavigate();
 const localrandom=(localStorage.getItem('random-recipe')!==("undefined" || undefined )) ? JSON.parse(localStorage.getItem('random-recipe')) : null;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

   console.log(randomRecipe)

 useEffect(()=>{
  !randomRecipe &&
  !localrandom &&
    errorAllRecipes &&
    !isLoadingAllRecipes &&
    !randomRecipeLoading &&
    !allRecipes &&
    setTimeout(() => {
      navigate("/");
    }, 2000);
    //eslint-disable-next-line
 },[])


  return (
    <>
      <div className="RecipeCard">
        { randomRecipeLoading  &&(
          <div className="loading">...Loading</div>
        )}
        { !randomRecipe && errorAllRecipes && !randomRecipeLoading && (
          <div className="error">
            Error! {errorAllRecipes}. It may not connect API.
            <br />
            <p>Redirecting to Home in 3 seconds!</p>
          </div>
        )}
        { (randomRecipe || localrandom ) && !randomRecipeLoading && !errorAllRecipes && (
          <>
            <div className="image">
              <img src={randomRecipe?.img || localrandom?.img} alt="" />
            </div>
            <div className="detail">
              <div className="title">
                <h1>{randomRecipe?.title || localrandom?.title}</h1>
              </div>
              <div className="share-buttons">
                <button>Favorilere Ekle</button>
                <button onClick={toggleModal}>Paylaş</button>
              </div>

              <div className="go-recipe-button">
                <Link to={`/random-recipe/${randomRecipe?.id || localrandom?.id}`}>
                  <button>Tarife Git</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          className="share-modal"
          overlayClassName="share-modal-overlay"
          contentLabel="Share Modal"
          ariaHideApp={false}
        >
          <button className="modal-close" onClick={toggleModal}>
            <TfiClose />
          </button>
          <h3>Bu tarifi paylaş!</h3>
          <div className="share-icons">
            <WhatsappShareButton
              className="icon"
              title={`Bulduğum tarife bak, ${randomRecipe?.name}`}
              separator=" "
              url={`${window.location.href}/${randomRecipe?.id}`}
            >
              <WhatsappIcon type="button" size={40} round={true} />
            </WhatsappShareButton>

            <TelegramShareButton
              className="icon"
              title={`Bulduğum tarife bak, ${randomRecipe?.name}`}
              url={`${window.location.href}/${randomRecipe?.id}`}
            >
              <TelegramIcon type="button" size={40} round={true} />
            </TelegramShareButton>

            <PinterestShareButton
              className="icon"
              title={`Bulduğum tarife bak, ${randomRecipe?.name}`}
              url={`${window.location.href}/${randomRecipe?.id}`}
            >
              <PinterestIcon type="button" size={40} round={true} />
            </PinterestShareButton>

            <EmailShareButton
              className="icon"
              subject={`Tarif: ${randomRecipe?.title}`}
              title={`Bulduğum tarife bak, ${randomRecipe?.name}`}
              url={`${window.location.href}/${randomRecipe?.id}`}
            >
              <EmailIcon type="button" size={40} round={true} />
            </EmailShareButton>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default RecipeCard;
