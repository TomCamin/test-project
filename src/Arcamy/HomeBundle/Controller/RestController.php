<?php

namespace Arcamy\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations,
    FOS\RestBundle\Controller\Annotations\NoRoute,
    FOS\RestBundle\Controller\Annotations\Get,
    FOS\RestBundle\Controller\Annotations\Delete,
    FOS\RestBundle\Controller\Annotations\Put,
    FOS\RestBundle\Controller\Annotations\Post;

class RestController extends Controller
{
    /**
     * @Get("/vegetals")
     * 
     */
    public function getVegetalsAction()
    {
        $vegetals = $this->getDoctrine()
                           ->getEntityManager()
                           ->getRepository('HomeBundle:Vegetal')
                           ->getAllVegetals();
        $view = View::create()  
          ->setStatusCode(200)  
          ->setData($vegetals);  
        
        return $view;
    } // "get_vegetals"    [GET] /vegetals
    
    /**
     * @DELETE("/vegetal/{id}")
     * 
     */
    public function deleteVegetalAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $guest = $em->getRepository('HomeBundle:Vegetal')->find($id);

        if (!$guest) {
            throw $this->createNotFoundException('No guest found for id '.$id);
        }

        $em->remove($guest);
        $em->flush();
        
        $view = View::create()  
          ->setStatusCode(200);  
        
        return $view;
    } // "delete_vegetal"    [DELETE] /vegetal/{id}
    
    /**
     * @GET("/vegetal/{id}")
     * 
     */
    public function getVegetalAction($id)
    {
        $vegetals = $this->getDoctrine()
                           ->getEntityManager()
                           ->getRepository('HomeBundle:Vegetal')
                           ->getVegetalById($id);
        $view = View::create()  
          ->setStatusCode(200)  
          ->setData($vegetals);  
        
        return $view;
    } // "get_vegetal"    [GET] /vegetal/{id}
    
    /**
     * @POST("/vegetal")
     * 
     */
    public function postVegetalAction(Request $request)
    {       
        $em = $this->getDoctrine()->getEntityManager();
        $type = $em->getRepository('HomeBundle:Type')->find($request->get('type'));
        
        $vegetable = new \Arcamy\HomeBundle\Entity\Vegetal();
        $vegetable->setName($request->get('name'));
        $vegetable->setDescription($request->get('description'));
        $vegetable->setType($type);
        //$vegetable->setCreatedAt(time());
        
        $em->persist($vegetable);
        $em->flush();
        
        $view = View::create()  
          ->setStatusCode(200);  
        
        return $view;
    } // "post_vegetal"    [POST] /vegetal
    
    /**
     * @PUT("/vegetal")
     * 
     */
    public function putVegetalAction(Request $request)
    {       
        $em = $this->getDoctrine()->getEntityManager();
        $vegetable = $em->getRepository('HomeBundle:Vegetal')->find($request->get('id'));
        $type = $em->getRepository('HomeBundle:Type')->find($request->get('type'));
        
        $vegetable->setName($request->get('name'));
        $vegetable->setDescription($request->get('description'));
        $vegetable->setType($type);
        //$vegetable->setCreatedAt(time());
        
        $em->persist($vegetable);
        $em->flush();
        
        $view = View::create()  
          ->setStatusCode(200);  
        
        return $view;
    } // "put_vegetal"    [PUT] /vegetal
    
    /**
     * @GET("/types")
     * 
     */
    public function getTypesAction()
    {
        $em = $this->getDoctrine()->getEntityManager();
        $type = $em->getRepository('HomeBundle:Type')->findAll();
        
        $view = View::create()  
          ->setStatusCode(200)  
          ->setData($type);  
        
        return $view;
    } // "get_types"    [GET] /types
}
