<?php

namespace Arcamy\HomeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Arcamy\HomeBundle\Entity\Vegetal
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Arcamy\HomeBundle\Entity\VegetalRepository")
 */
class Vegetal
{
    
    /**
     * @ORM\ManyToOne(targetEntity="Arcamy\HomeBundle\Entity\Type")
     * @ORM\JoinColumn(nullable=false)
     */
    private $type;
    
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string $name
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string $description
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @var \DateTime $createdAt
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Vegetal
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Vegetal
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Vegetal
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    
        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set type
     *
     * @param Arcamy\HomeBundle\Entity\Type $type
     * @return Vegetal
     */
    public function setType(\Arcamy\HomeBundle\Entity\Type $type)
    {
        $this->type = $type;
    
        return $this;
    }

    /**
     * Get type
     *
     * @return Arcamy\HomeBundle\Entity\Type 
     */
    public function getType()
    {
        return $this->type;
    }
}