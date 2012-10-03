<?php

namespace Arcamy\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\View\View;

class RestController extends Controller
{
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
    } // "delete_vegetal"    [GET] /vegetal/delete/{id}
    
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
}
