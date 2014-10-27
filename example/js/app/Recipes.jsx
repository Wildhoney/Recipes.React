/** @jsx React.DOM */

(function($react, $jquery, RecipesInterface) {

    "use strict";

    /**
     * @property recipes
     * @type {window.RecipesInterface}
     */
    var recipes = new RecipesInterface();

    /**
     * @property Recipes
     * @type {Function}
     */
    var Recipes = $react.createClass({

        /**
         * @method getInitialState
         * @returns {Object}
         */
        getInitialState: function getInitialState() {
            return { collection: [] };
        },

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount: function componentDidMount() {
            this.loadRecipes();
        },

        /**
         * @method recipeDidAdd
         * @param name {String}
         * @param description {String}
         * @return {void}
         */
        recipeDidAdd: function recipeDidAdd(name, description) {
            console.log(this);
            this.loadRecipes();
        },

        /**
         * @method loadRecipes
         * @return {void}
         */
        loadRecipes: function loadRecipes() {

            recipes.getRecipes().then(function then(response) {

                // Modify the state of the React component to include the collection of recipes.
                this.setState({ collection: collection._items });

            });

        },

        /**
         * @method render
         * @return {XML}
         */
        render: function() {

            return (
                <div>
                    <h1>Recipes</h1>
                    <RecipeList collection={this.state.collection} />
                    <RecipeForm success={this.recipeDidAdd} />
                </div>
            );

        }

    });

    /**
     * @property RecipeList
     * @type {Function}
     */
    var RecipeList = $react.createClass({

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {

            /**
             * @property recipeElements
             * @type {Array}
             */
            var recipeElements = this.props.collection.map(function map(recipe) {

                recipe.text = '';

                return (
                    <li>
                        <Recipe name={recipe.name} ingredients={recipe.ingredients}>
                            {recipe.text}
                        </Recipe>
                    </li>
                );

            });

            return (
                <section>
                    <h2>List of Recipes ({recipeElements.length})</h2>
                    { this.props.collection.length ? <ul>{recipeElements}</ul> : <div>Loading...</div> }
                </section>
            );

        }

    });

    /**
     * @property Recipe
     * @type {Function}
     */
    var Recipe = $react.createClass({

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {

            return (
                <section>
                    <h3>{this.props.name} ({this.props.ingredients.length} ingredients)</h3>
                    {this.props.children}
                </section>
            );

        }

    });

    /**
     * @property RecipeForm
     * @type {Function}
     */
    var RecipeForm = $react.createClass({

        /**
         * @method addRecipe
         * @param event {Object}
         * @return {Boolean}
         */
        addRecipe: function addRecipe(event) {

            event.preventDefault();

            // Associate the DOM references to local variables.
            var nameElement        = this.refs.name.getDOMNode(),
                descriptionElement = this.refs.description.getDOMNode();

            // Determine the values of the name and description.
            var name        = nameElement.value.trim(),
                description = descriptionElement.value.trim();

            if (!name || !description) {
                return false;
            }

            // Empty the values from the form fields.
            nameElement.value        = '';
            descriptionElement.value = '';

            recipes.addRecipe(name, description, []).then(function then(response) {

                // Invoke the method on the parent so the recipe list can be updated.
                this.props.success();

            }.bind(this));

        },

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {

            return (
                <section>
                    <h2>Submit Recipe</h2>
                    <form onSubmit={this.addRecipe}>
                        <input type="text" placeholder="Recipe name" ref="name" />
                        <textarea ref="description"></textarea>
                        <input type="submit" value="Add Recipe" />
                    </form>
                </section>
            );

        }

    });

    $react.renderComponent(
        <Recipes url="http://learn-api.herokuapp.com/recipes" />,
        document.querySelector('recipes')
    );

})(window.React, window.jQuery, window.RecipesInterface);