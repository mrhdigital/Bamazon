#Bamazon

### Synopsis
***

An interactive shopping node app where MySQL and Node.JS are used to allow users to purchase items as a customer, view, track and update the product inventory as a manager.

##### Bamazon Customer Portal
***

The Bamazon Customer Portal allows users to view the current items available for purchase.  The user will be prompted to enter the item id# and how many items they wish to purchase.  If the item is in stock, the order will be completed and the user will see the total amount of their purchase. if the item is not in stock, "insufficient quantity" message will be displayed

![Customer Portal - Items purchased](Images/customerView01.png)
![Customer Portal - Insufficent quanity](Images/customerView02.png)


##### Bamazon Manager Portal
***

The Bamazon Customer Portal allows users to view and edit the inventory of the store.  The user will be prompted to choose from the following options:
* View products for sale
* View low inventory
* Add to inventory
* Add a new product
* Quit


###### Manager Options 1 , 2 & 3
***

The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, the price of the product and how much stock is left for that product.

The second option allows the user to see a list of all inventory items that have less than 5 items in stock.  If there are no products that meet this criteria, the user will see an empty table.

The third option allows the user to update the inventory for a specific product.  A prompt asks what the id is for the product the user wants to update.  A second prompt asks how many items the user wishes to increase the quantity by.


![Bamazon Manager Portal - Options 1](Images/managerView01.png)
![Bamazon Manager Portal - Options 2 & 3](Images/managerView02.png)


###### Manager Options  4
***



The last option allows the user to add a new product to the inventory.  Prompts ask the user for the product id#, the product name, the department name, the price and the stock quantity.

![Bamazon Manager Portal - Options 4](Images/managerView03.png)




#### Contributors:
***

Mirza Hameed [GitHub](https://github.com/mrhdigital)



#### Technologies Used:
***

* Javascript
* nodeJS
* MySQL
* npm packages:
	- [mysql](https://github.com/felixge/node-mysql)
	- [prompt](https://github.com/flatiron/prompt)
	- [cli-table](https://github.com/Automattic/cli-table)





