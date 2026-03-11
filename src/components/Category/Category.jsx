import  {categoryImage} from './categoryImg.js'; 
import CategoryCard from './CategoryCard';
import classes from './Category.module.css';

const Category = () => {
  return (
    <div className={classes.category_container}>
      {categoryImage.map((data, index) => (
        <CategoryCard key={index} data={data} />
      ))}
    </div>
  );
};

export default Category;