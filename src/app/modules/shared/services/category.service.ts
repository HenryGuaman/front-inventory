import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  /**
   * 
   * get all categories
   */
  constructor(private http: HttpClient) {}
    getCategories(){
      const endpoint = `${base_url}/categories`;
      return this.http.get(endpoint)
    }
  /**
   * save the categories */   
  
  saveCategories(body:any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * update service
   */

  updateCategory(body: any, id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.put(endpoint, body);
    
  }
  /**
   * Delete categories
   * 
   */
  deleteCategories(id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.delete(endpoint);
    
  }

  /**
   * 
   * @param id bscar id
   * @returns 
   */
  getCategorieById(id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.get(endpoint);
    
  }

  /**
   * 
   * @param id Export to excel
   * @returns 
   */
  exportCategories(){
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint,{
      responseType: 'blob'
    });
    
  }
}
